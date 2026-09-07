import { SurveyForm } from "@/components/survey/survey-form";
import { configured } from "@/lib/survey/server";
export const dynamic = "force-dynamic";
export default function SurveyPage() {
  const connected = configured();
  const preview =
    !connected &&
    (process.env.SURVEY_PREVIEW_MODE === "1" ||
      process.env.NODE_ENV === "development");
  return <SurveyForm preview={preview} available={connected || preview} />;
}
