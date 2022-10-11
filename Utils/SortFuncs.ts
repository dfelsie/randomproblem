import LeetQuestion from "../types/leetQuestion";

export function compareTitles(
  questionA: LeetQuestion,
  questionB: LeetQuestion
) {
  const a = questionA.title;
  const b = questionB.title;
  return a > b;
}
export function compareDifficulties(
  questionA: LeetQuestion,
  questionB: LeetQuestion
) {
  const a = questionA.difficulty;
  const b = questionB.difficulty;
  if (a === b) {
    return compareTitles(questionA, questionB);
  }
  if (a === "Hard") return 1;
  if (a === "Easy") return -1;
  if (b === "Hard") return -1;
  return 1;
}
export function compareNumber(a: any, b: any) {
  return 1;
}
export function compareLikes(questionA: LeetQuestion, questionB: LeetQuestion) {
  const a = questionA.numLikes;
  const b = questionB.numLikes;
  return a - b;
}
export function compareDislikes(
  questionA: LeetQuestion,
  questionB: LeetQuestion
) {
  const a = questionA.numDislikes;
  const b = questionB.numDislikes;
  return a - b;
}
export function comparePercentLiked(
  questionA: LeetQuestion,
  questionB: LeetQuestion
) {
  const a = questionA.numLikes / (questionA.numDislikes + questionA.numLikes);
  const b = questionB.numLikes / (questionB.numDislikes + questionB.numLikes);
  return a - b;
}
