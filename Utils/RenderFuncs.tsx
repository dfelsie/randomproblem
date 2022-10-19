import React from "react";
/**
 *
 * Create an element representing a digital clock
 * with the current time
 * @param {boolean} assessmentStarted whether the assessment
 * has started
 * @param {number} assessmentTimer
 * @return {JSXElement}  {*}
 */
export function clockRender(
  assessmentStarted: boolean,
  assessmentTimer: number
): any {
  if (assessmentStarted) {
    return (
      <p>
        <span>{Math.floor(assessmentTimer / 60)}</span>h {"  "}
        <span>
          {assessmentTimer % 60 > 9
            ? assessmentTimer % 60
            : "0" + (assessmentTimer % 60)}
        </span>
        m remaining
      </p>
    );
  }
  return <p></p>;
}
