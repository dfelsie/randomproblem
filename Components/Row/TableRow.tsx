import React from "react";
import tableStyles from "../../styles/Table.module.css";
import LeetQuestion from "../../types/LeetQuestion";
type Props = {
  question: LeetQuestion;
  number: number;
};

export default function QuestionTableRow({ number, question }: Props) {
  return (
    <tr>
      <td>{number}</td>
      <td>{question.difficulty}</td>
      <td className={tableStyles.linkCol}>
        <a target="_blank" rel="noopener noreferrer" href={question.link}>
          <p>{question.title}</p>
        </a>
      </td>
      <td>{question.numLikes}</td>
      <td>{question.numDislikes}</td>
      <td>
        {Math.round(
          (question.numLikes /
            (question.numLikes + question.numDislikes + Number.EPSILON)) *
            10000
        ) / 100}
      </td>
    </tr>
  );
}
