type LeetQuestion = {
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  numLikes: number;
  numDislikes: number;
  link: string;
  category?: string;
};
export default LeetQuestion;
