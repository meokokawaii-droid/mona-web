"use client";
import { useEffect, useRef, useState } from "react";
import { Model, type CompletingEvent } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/i18n/simplified-chinese";
import "survey-core/survey-core.fontless.css";
import { createSurveySchema } from "@/lib/survey/surveyjs-schema";
import {
  surveyQuestions,
  emptyDemographics,
  getScaleLabel,
  type Demographics,
} from "@/lib/survey/surveyQuestions";
export type EngineDraft = {
  step: number;
  answers: Record<string, string>;
  demographics: Demographics;
};
type Props = {
  initial: EngineDraft;
  preview: boolean;
  busy: boolean;
  onChange: (data: EngineDraft) => void;
  onSubmit: (data: EngineDraft) => Promise<void>;
};
function snapshot(model: Model): EngineDraft {
  const answers: Record<string, string> = {};
  for (const q of surveyQuestions) {
    const value = model.getValue(q.id);
    if (value !== undefined && value !== null && value !== "")
      answers[q.id] = String(value);
  }
  const demographics = { ...emptyDemographics };
  for (const key of Object.keys(demographics) as (keyof Demographics)[])
    if (key === "information_channels")
      demographics[key] = Array.isArray(model.getValue(key))
        ? [...model.getValue(key)]
        : [];
    else demographics[key] = String(model.getValue(key) ?? "");
  return { step: model.currentPageNo, answers, demographics };
}
export default function SurveyEngine({
  initial,
  preview,
  busy,
  onChange,
  onSubmit,
}: Props) {
  const [model] = useState(() => {
    const m = new Model(createSurveySchema(preview));
    m.applyTheme({
      cssVariables: {
        "--sjs2-color-project-brand-600": "#425c59",
        "--sjs2-color-project-brand-700": "#344c49",
      },
    });
    m.data = {
      ...Object.fromEntries(
        Object.entries(initial.answers).map(([k, v]) => [k, Number(v)]),
      ),
      ...initial.demographics,
    };
    m.currentPageNo = initial.step;
    return m;
  });
  const [step, setStep] = useState(initial.step);
  const [selected, setSelected] = useState(
    initial.answers[surveyQuestions[initial.step]?.id] ?? "",
  );
  const actions = useRef({ onChange, onSubmit, busy });
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    actions.current = { onChange, onSubmit, busy };
  }, [onChange, onSubmit, busy]);
  useEffect(() => {
    const persist = () => {
      const selectedChannels = model.getValue("information_channels") || [];
      if (
        model.getValue("information_source") &&
        !selectedChannels.includes(model.getValue("information_source"))
      )
        model.clearValue("information_source");
      const data = snapshot(model);
      setStep(data.step);
      setSelected(data.answers[surveyQuestions[data.step]?.id] ?? "");
      actions.current.onChange(data);
    };
    const complete = (_: Model, options: CompletingEvent) => {
      options.allow = false;
      if (!actions.current.busy) void actions.current.onSubmit(snapshot(model));
    };
    const renderQuestion = (
      _: Model,
      options: { question: { name: string }; htmlElement: HTMLElement },
    ) => {
      const q = surveyQuestions.find((q) => q.id === options.question.name);
      if (q)
        options.htmlElement
          .querySelectorAll<HTMLElement>('[role="radio"], input[type="radio"]')
          .forEach((el, index) => {
            if (index < 7)
              el.setAttribute(
                "aria-label",
                `${index + 1}，${getScaleLabel(q, index + 1)}`,
              );
          });
    };
    function keydown(event: KeyboardEvent) {
      if (
        actions.current.busy ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.repeat
      )
        return;
      const target = event.target as HTMLElement;
      if (!container.current?.contains(target)) return;
      const q = surveyQuestions[model.currentPageNo];
      if (!q) return;
      const input = target as HTMLInputElement;
      if (
        q.type === "likert" &&
        /^[1-7]$/.test(event.key) &&
        !["TEXTAREA", "SELECT"].includes(target.tagName) &&
        (target.tagName !== "INPUT" || input.type === "radio")
      ) {
        event.preventDefault();
        event.stopPropagation();
        model.setValue(q.id, Number(event.key));
      }
      if (
        event.key === "Enter" &&
        target.tagName !== "BUTTON" &&
        target.tagName !== "A" &&
        input.type !== "button"
      ) {
        event.preventDefault();
        event.stopPropagation();
        model.nextPage();
      }
    }
    model.onValueChanged.add(persist);
    model.onCurrentPageChanged.add(persist);
    model.onCompleting.add(complete);
    model.onAfterRenderQuestion.add(renderQuestion);
    const element = container.current;
    element?.addEventListener("keydown", keydown, true);
    return () => {
      model.onValueChanged.remove(persist);
      model.onCurrentPageChanged.remove(persist);
      model.onCompleting.remove(complete);
      model.onAfterRenderQuestion.remove(renderQuestion);
      element?.removeEventListener("keydown", keydown, true);
    };
  }, [model]);
  useEffect(() => {
    container.current?.focus();
  }, [step]);
  useEffect(() => {
    const item = surveyQuestions[step];
    if (item)
      container.current
        ?.querySelectorAll<HTMLElement>('input[type="radio"]')
        .forEach((el, index) =>
          el.setAttribute(
            "aria-label",
            `${index + 1}，${getScaleLabel(item, index + 1)}`,
          ),
        );
  }, [step, selected]);
  const q = surveyQuestions[step];
  return (
    <div
      className={`survey-engine ${q ? "" : "survey-engine--demographics"}`}
      ref={container}
      tabIndex={-1}
      aria-busy={busy}
    >
      <div className="survey-progress-heading">
        <span>{q ? `第 ${step + 1} 题` : "最后一步 · 基础信息"}</span>
        <span>
          {Math.min(step + 1, surveyQuestions.length)} /{" "}
          {surveyQuestions.length}
        </span>
      </div>
      <progress
        value={step}
        max={surveyQuestions.length}
        aria-label="答题进度"
      />
      <fieldset className="survey-engine-fieldset" disabled={busy}>
        <Survey model={model} />
      </fieldset>
      {q && (
        <div className="survey-engine-scale-caption">
          <p className="survey-selection" aria-live="polite">
            {selected ? `${selected} · ${getScaleLabel(q, Number(selected))}` : "请选择一个数字"}
          </p>
        </div>
      )}
      {q && <p className="survey-hint">数字键1–7选择，回车继续</p>}
    </div>
  );
}
