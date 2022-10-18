import {
  speakJson,
  amazonJSON,
  blindJson,
  labelToDataset,
  dummyQuestion,
} from "./../consts/Consts";
import LeetQuestion from "../types/LeetQuestion";
import LeetQuestionOpt from "../types/LeetQuestionOptions";

function findFunc(optsAry: LeetQuestionOpt[]) {
  let questionAry: LeetQuestion[] = [];
  for (let i = 0; i < optsAry.length; i++) {
    questionAry.push(getQuestion(optsAry[i], questionAry));
  }
  return questionAry;
}

function getQuestion(opts: LeetQuestionOpt, prevQuestions: LeetQuestion[]) {
  let diff;
  let dataset: LeetQuestion[];
  if (opts.dataset in labelToDataset) {
    dataset = labelToDataset[opts.dataset as string];
  } else {
    dataset = labelToDataset["Any"];
  }
  const acceptableAry = dataset.filter((val, ind) => {
    return (
      (opts.difficulty === "Any" || val.difficulty === opts.difficulty) &&
      !prevQuestions.some((question) => question.title === val.title)
    );
  });
  if (acceptableAry.length === 0) {
    return dummyQuestion;
  }
  const randomElement =
    acceptableAry[Math.floor(Math.random() * acceptableAry.length)];
  return randomElement;
}

export default findFunc;
