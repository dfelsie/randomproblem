import React from "react";
import styles from "./HeroText.module.css";
type Props = {
  bodyText: string;
  headingText: string;
};

export default function HeroText({ bodyText, headingText }: Props) {
  return (
    <div className={styles.text}>
      <h2>{headingText}</h2>
      <p>{bodyText}</p>
    </div>
  );
}
