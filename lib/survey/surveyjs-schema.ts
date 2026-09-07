import {
  surveyQuestions,
  demographicsOptions,
  demographicLabels,
} from "./surveyQuestions";
export function createSurveySchema(preview: boolean) {
  return {
    locale: "zh-cn",
    showTitle: false,
    showQuestionNumbers: "off",
    questionOrder: "initial",
    showProgressBar: false,
    showCompletedPage: false,
    focusFirstQuestionAutomatic: false,
    checkErrorsMode: "onNextPage",
    textUpdateMode: "onTyping",
    clearInvisibleValues: "none",
    pagePrevText: "上一题",
    pageNextText: "下一题",
    completeText: preview ? "完成预览" : "匿名提交",
    requiredText: "",
    questionErrorLocation: "bottom",
    widthMode: "responsive",
    pages: [
      ...surveyQuestions.map((q) => ({
        name: `page_${q.id}`,
        elements: [
          {
            name: q.id,
            title: q.text,
            isRequired: true,
            requiredErrorText: "请回答本题后继续。",
            type: "rating",
            rateType: "labels",
            displayMode: "buttons",
            rateMin: 1,
            rateMax: 7,
            rateCount: 7,
            minRateDescription: "非常不同意",
            maxRateDescription: "非常同意",
            rateDescriptionLocation: "bottom",
            rateValues: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      })),
      {
        name: "demographics",
        title: "基本信息",
        description: "仅用于匿名统计分析。",
        elements: (
          Object.keys(
            demographicsOptions,
          ) as (keyof typeof demographicsOptions)[]
        ).map((name, index) => ({
          type: name === "information_channels" ? "checkbox" : "dropdown",
          ...(name !== "information_channels" ? { renderAs: "select" } : {}),
          name,
          title: `${index + 1}. ${demographicLabels[name]}`,
          description: name === "information_channels" ? "可多选。" : undefined,
          choices: [...demographicsOptions[name]],
          choicesOrder: "none",
          isRequired: true,
          placeholder: "请选择",
          allowClear: false,
          requiredErrorText:
            name === "information_channels"
              ? "请至少选择一项。"
              : "请选择一项。",
          searchEnabled: false,
        })),
      },
    ],
  };
}
