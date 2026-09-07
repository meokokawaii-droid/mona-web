"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function AdminLogin() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <form
      className="survey-card"
      onSubmit={async (e) => {
        e.preventDefault();
        if (busy) return;
        setBusy(true);
        setError("");
        const form = new FormData(e.currentTarget);
        try {
          const response = await fetch("/api/admin/survey/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.get("email"),
              password: form.get("password"),
            }),
          });
          const data = await response.json();
          if (!response.ok) throw Error(data.error);
          router.refresh();
        } catch (e) {
          setError(e instanceof Error ? e.message : "登录失败，请重试。");
        } finally {
          setBusy(false);
        }
      }}
    >
      <h1>调查管理登录</h1>
      <p>请使用已授权的管理员账户。</p>
      <label className="survey-field">
        邮箱
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="survey-field">
        密码
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      <Button className="survey-primary" disabled={busy}>
        {busy ? "登录中…" : "登录"}
      </Button>
      {error && (
        <p className="survey-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
export function Logout() {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <>
      <Button
        className="survey-secondary"
        onClick={async () => {
          try {
            const r = await fetch("/api/admin/survey/login", {
              method: "DELETE",
            });
            if (!r.ok) throw Error();
            router.refresh();
          } catch {
            setError("退出失败，请重试。");
          }
        }}
      >
        退出登录
      </Button>
      {error && <span role="alert">{error}</span>}
    </>
  );
}
