"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { EngineDraft } from "./survey-engine";
const SurveyEngine = dynamic(() => import("./survey-engine"), {
  ssr: false,
  loading: () => (
    <section className="survey-card survey-loading" aria-busy="true">
      正在加载问卷…
    </section>
  ),
});
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  surveyQuestions as questions,
  SURVEY_VERSION,
  SURVEY_TITLE,
  emptyDemographics,
  type Demographics,
} from "@/lib/survey/surveyQuestions";
const DRAFT = `cnys-draft-${SURVEY_VERSION}`,
  DONE = `cnys-completed-${SURVEY_VERSION}`;
type Draft = {
  version: string;
  token: string;
  step: number;
  answers: Record<string, string>;
  demographics: Demographics;
};
const fresh = (): Draft => ({
  version: SURVEY_VERSION,
  token: "",
  step: 0,
  answers: {},
  demographics: { ...emptyDemographics },
});
const validAnswer = (id: string, raw?: string) =>
  raw !== undefined &&
  raw.trim() !== "" &&
  Number.isFinite(Number(raw)) &&
  Number.isInteger(Number(raw)) &&
  Number(raw) >= 1 &&
  Number(raw) <= 7;
function restore(raw: string): Draft | null {
  try {
    const value = JSON.parse(raw);
    if (
      value.version !== SURVEY_VERSION ||
      typeof value.token !== "string" ||
      !value.token ||
      !Number.isInteger(value.step) ||
      !value.answers ||
      !value.demographics
    )
      return null;
    const next = fresh();
    next.token = value.token;
    for (const q of questions)
      if (
        typeof value.answers[q.id] === "string" &&
        validAnswer(q.id, value.answers[q.id])
      )
        next.answers[q.id] = value.answers[q.id];
    for (const key of Object.keys(next.demographics) as (keyof Demographics)[])
      if (key === "information_channels")
        next.demographics[key] = Array.isArray(value.demographics[key])
          ? value.demographics[key].filter(
              (v: unknown) => typeof v === "string",
            )
          : [];
      else if (typeof value.demographics[key] === "string")
        next.demographics[key] = value.demographics[key];
    const missing = questions.findIndex(
      (q) => !validAnswer(q.id, next.answers[q.id]),
    );
    next.step = Math.max(
      0,
      Math.min(value.step, missing < 0 ? questions.length : missing),
    );
    return next;
  } catch {
    return null;
  }
}
export function SurveyForm({
  preview = false,
  available = true,
}: {
  preview?: boolean;
  available?: boolean;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(fresh);
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [previewFinished, setPreviewFinished] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [storageWarning, setStorageWarning] = useState("");
  const lock = useRef(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (preview) {
        setReady(true);
        return;
      }
      try {
        setCompleted(!!localStorage.getItem(DONE));
        const saved = localStorage.getItem(DRAFT);
        const restored = saved && restore(saved);
        if (restored) setDraft(restored);
      } catch {
        setStorageWarning("浏览器无法保存本地进度，请保持此页面打开直至提交。");
      }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [preview]);
  function update(next: Draft) {
    setDraft(next);
    if (preview) return;
    try {
      localStorage.setItem(DRAFT, JSON.stringify(next));
    } catch {
      setStorageWarning("浏览器无法保存本地进度，请保持此页面打开直至提交。");
    }
  }
  async function start() {
    if (!available || lock.current) return;
    if (preview) {
      setError("");
      setPreviewFinished(false);
      update({ ...fresh(), token: "local-preview-only" });
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/survey/start", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw Error(result.error);
      update({ ...fresh(), token: result.token });
      setCompleted(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "无法开始填写，请重试。");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  async function submit(data: EngineDraft) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      if (!questions.every((q) => validAnswer(q.id, data.answers[q.id])))
        throw Error("仍有题目未完成，请返回检查。");
      const d = data.demographics;
      if (preview) {
        setDraft(fresh());
        setPreviewFinished(true);
        return;
      }
      const response = await fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: SURVEY_VERSION,
          token: draft.token,
          answers: Object.fromEntries(
            Object.entries(data.answers).map(([key, value]) => [
              key,
              Number(value),
            ]),
          ),
          demographics: d,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.error);
      try {
        localStorage.setItem(DONE, result.public_id);
        localStorage.removeItem(DRAFT);
      } catch {
        /* Server receipt is authoritative. */
      }
      router.replace("/survey/success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "提交失败，请保留页面后重试。");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const intro = !draft.token || completed;
  return (
    <main className="survey-wrap">
      <header className="survey-top">
        <Link href="/">返回首页</Link>
        <span>匿名 · 18–35岁</span>
      </header>
      {preview && (
        <p className="survey-notice" role="status">
          本地预览 · 回答不会保存或提交，刷新后重新开始。
        </p>
      )}
      {!available && (
        <p className="survey-notice" role="status">
          调查暂未开放，尚不能接收回答。
        </p>
      )}
      {previewFinished ? (
        <section className="survey-card">
          <h1>预览完成</h1>
          <p>你已完成全部观点题和基本信息。</p>
          <p>本次回答未保存，也未提交到服务器。</p>
          <Button className="survey-primary" onClick={start}>
            重新预览
          </Button>
          <Link className="survey-link" href="/">
            返回首页
          </Link>
        </section>
      ) : !ready ? (
        <section className="survey-card survey-loading" aria-busy="true">
          正在读取填写进度…
        </section>
      ) : intro ? (
        <>
          <section className="survey-card survey-intro">
            <p className="survey-eyebrow">V2.1 · 社会观念</p>
            <h1>{SURVEY_TITLE}</h1>
            <div className="survey-rule" />
            <p>
              本调查希望了解青年群体对于个人生活、社会环境、信息获取以及公共事务等问题的看法。
            </p>
            <p>问卷完全匿名，不收集姓名、手机号等个人身份信息。</p>
            <p>所有题目均没有标准答案，请根据自己的真实想法作答。</p>
            <p className="survey-muted">
              适用人群：18–35岁 · 45 道量表题 + 8 项基本信息
            </p>
            {completed && (
              <p className="survey-notice">该设备似乎已经完成过本调查。</p>
            )}
            <Button
              className="survey-primary"
              disabled={busy || !available}
              onClick={start}
            >
              {busy
                ? "准备中…"
                : completed
                  ? "重新填写（用于测试）"
                  : preview
                    ? "开始预览"
                    : available
                      ? "开始填写"
                      : "暂未开放"}
            </Button>
            {completed && (
              <Link className="survey-link" href="/survey/success">
                查看提交凭证
              </Link>
            )}
          </section>
          <footer className="survey-privacy">
            <h2>隐私说明</h2>
            <p>
              本调查不要求填写姓名、手机号或其他直接身份信息。所有数据仅以匿名统计形式用于个人研究与分析。
            </p>
            <p>
              {preview
                ? "预览回答仅保留在当前页面内存中，刷新或关闭后清除。"
                : "填写进度会暂存在当前浏览器，提交成功后清除。你可以在提交前随时退出。"}
            </p>
          </footer>
        </>
      ) : (
        <>
          <SurveyEngine
            key={draft.token}
            initial={draft}
            preview={preview}
            busy={busy}
            onChange={(data) => update({ ...draft, ...data })}
            onSubmit={submit}
          />
          <p className="survey-hint">
            {preview
              ? "当前为预览模式，刷新后重新开始。"
              : "进度保存在当前浏览器，可稍后继续。"}
          </p>
        </>
      )}
      {error && (
        <p className="survey-error" role="alert">
          {error}
        </p>
      )}
      {storageWarning && (
        <p className="survey-error" role="status">
          {storageWarning}
        </p>
      )}
    </main>
  );
}
