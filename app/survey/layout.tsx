import type { Metadata } from "next";
import "./survey.css";
export const metadata: Metadata = {
  title: "中国青年社会观念调查",
  description:
    "匿名 · 18–35岁。了解青年对于个人生活、社会环境、信息获取及公共事务等问题的看法。",
};
export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="survey-shell" data-ins-skip-fx>
      {children}
    </div>
  );
}
