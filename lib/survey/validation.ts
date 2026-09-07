import { z } from "zod";
import {
  surveyQuestions,
  demographicsOptions as options,
  SURVEY_VERSION,
} from "./surveyQuestions";
export const demographicsSchema = z
  .object({
    age_group: z.enum(options.age_group),
    gender: z.enum(options.gender),
    education: z.enum(options.education),
    upbringing: z.enum(options.upbringing),
    current_residence: z.enum(options.current_residence),
    family_economic_status: z.enum(options.family_economic_status),
    overseas_experience_category: z.enum(options.overseas_experience_category),
    information_channels: z
      .array(z.enum(options.information_channels))
      .min(1)
      .max(16),
  })
  .strict()
  .superRefine((d, ctx) => {
    if (new Set(d.information_channels).size !== d.information_channels.length)
      ctx.addIssue({
        code: "custom",
        path: ["information_channels"],
        message: "请勿重复选择渠道。",
      });
  });
export const submissionSchema = z
  .object({
    version: z.literal(SURVEY_VERSION),
    token: z.string().min(20).max(2048),
    answers: z
      .object(
        Object.fromEntries(
          surveyQuestions.map((q) => [q.id, z.number().int().min(1).max(7)]),
        ),
      )
      .strict(),
    demographics: demographicsSchema,
  })
  .strict();
