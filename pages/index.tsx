import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import HeroText from "../Components/HeroText/HeroText";
import styles from "../styles/Home.module.css";
import tableStyles from "../styles/Table.module.css";
import LeetQuestion from "../types/LeetQuestion";
import TableHead from "../Components/TableHead/TableHead";
import SortOption from "../types/SortOption";
import {
  compareDifficulties,
  compareDislikes,
  compareLikes,
  compareNumber,
  comparePercentLiked,
  compareTitles,
} from "../Utils/SortFuncs";
import QuestionTableRow from "../Components/Row/TableRow";
import {
  speakJson,
  blindJson,
  amazonJSON,
  googleJSON,
  allJson,
  singleQuestion,
  singleQuestionOpt,
  datasetOpts,
  difficultyOpts,
  ytLinks,
} from "../consts/Consts";
import LeetQuestionOpt from "../types/LeetQuestionOptions";
import findFunc from "../Utils/FindFuncs";
import joinClasses from "../Utils/joinClasses";
import { getVids } from "../Utils/FetchFuncs";
import VidLink from "../Components/VidLink/VidLink";
import { clockRender } from "../Utils/RenderFuncs";

/**
 * get n random elements from array
 *
 * @param {any[]} arr options to select randomly from
 * @param {number} n number of random elements to get
 * @return {any[]} array of random elements
 */
function getRandom(arr: any[], n: number): any[] {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

/**
 *
 * Helper function to take numeric string
 * as input, get possibleSelection number of elements from
 * the jsonList, then use setList to set the function
 * in glonal state
 * @param {string} possibleSelection
 * @param {LeetQuestion[]} jsonList
 * @param {(val: any[]) => void} setList
 * @return {void}
 */
function getRandList(
  possibleSelection: string,
  jsonList: LeetQuestion[],
  setList: (val: any[]) => void
) {
  if (
    typeof possibleSelection != "string" ||
    isNaN(parseInt(possibleSelection))
  ) {
    return;
  }
  let selectionNum = parseInt(possibleSelection);
  if (selectionNum > jsonList.length) {
    setList(jsonList);
    return;
  }
  setList(getRandom(jsonList, selectionNum));
}

const Home: NextPage = () => {
  const [fullProblemList, setfullProblemList] = useState(speakJson);
  const [problemList, setproblemList] = useState(fullProblemList);
  const [assesmentProblemList, setassesmentProblemList] = useState<
    LeetQuestionOpt[]
  >([singleQuestionOpt, singleQuestionOpt]);
  const [randNum, setRandNum] = useState("10");
  const [assessmentTimer, setassessmentTimer] = useState(105);
  const [assessmentStarted, setassessmentStarted] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [sortOption, setsortOption] = useState({
    isAscending: false,
    category: "Number",
  });
  const [vidList, setVidList] = useState<any[]>([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Leetcode practice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <HeroText
          bodyText="Choose a curated set of Leetcode questions to practice, or get a random selection!"
          headingText="Improve Your Skills!"
        />
        <div id={tableStyles.tableButtonDiv}>
          <div>
            <label htmlFor="problem_num">How many random questions?</label>

            <input
              name="problem_num"
              id="problem_num"
              onChange={(e) => {
                setRandNum(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                getRandList(randNum, fullProblemList, setproblemList);
                setsortOption({ isAscending: false, category: "Number" });
              }}
            >
              Get Problems
            </button>
          </div>

          <div id={tableStyles.selectDiv}>
            <label htmlFor="questionlist">Choose a question set</label>
            <select
              name="questionlist"
              id="questionSelect"
              onChange={() => {
                setsortOption({ isAscending: false, category: "Number" });
              }}
            >
              <option
                onClick={() => {
                  setfullProblemList(speakJson);
                  setproblemList(speakJson);
                }}
              >
                Speak Questions
              </option>
              <option
                onClick={() => {
                  setfullProblemList(blindJson);
                  setproblemList(blindJson);
                }}
              >
                Blind 75
              </option>
              <option
                onClick={() => {
                  setfullProblemList(amazonJSON);
                  setproblemList(amazonJSON);
                }}
              >
                Amazon Questions
              </option>
              <option
                onClick={() => {
                  setfullProblemList(googleJSON);
                  setproblemList(googleJSON);
                }}
              >
                Google Questions
              </option>
              <option
                onClick={() => {
                  setfullProblemList(allJson);
                  setproblemList(allJson);
                }}
              >
                All Questions
              </option>
            </select>
          </div>
        </div>
        <div id={tableStyles.formHolderHolder}>
          <h4>Create practice test!</h4>

          <details id={"assessmentFormHolder"}>
            <summary id={tableStyles.formSum}>Create test form</summary>
            <div className={tableStyles.subForm}>
              <div className={tableStyles.selectColDiv}>
                <label htmlFor={`AssesmentDatasetSelectionAll`}>
                  Set Dataset For All Questions
                </label>
                <select
                  name={`AssesmentDatasetSelectionAll`}
                  id={`AssesmentDatasetSelectionAll`}
                  defaultValue={""}
                >
                  {datasetOpts.map((datasetNameVal, n) => (
                    <option
                      key={`companyOpt${n}ForSelectAll`}
                      onClick={() => {
                        setassesmentProblemList([
                          ...assesmentProblemList.map((val, ind) => {
                            const nVal: LeetQuestionOpt = { ...val };
                            nVal.dataset = datasetNameVal;
                            return nVal;
                          }),
                        ]);
                      }}
                    >
                      {datasetNameVal}
                    </option>
                  ))}
                </select>
              </div>
              <ul>
                {assesmentProblemList.map((val, i) => (
                  <li
                    className={tableStyles.problemListQuestion}
                    key={`AssesmentQuestionNum${i}`}
                  >
                    <h3> {`Question ${i + 1}`}</h3>
                    <div className={tableStyles.selectColDiv}>
                      <label htmlFor={`AssesmentDatasetSelection${i}`}>
                        Dataset
                      </label>
                      <select
                        name={`AssesmentDatasetSelection${i}`}
                        id={`AssesmentDatasetSelection${i}`}
                        value={assesmentProblemList[i].dataset}
                        onChange={() => {}}
                      >
                        {datasetOpts.map((datasetNameVal, n) => (
                          <option
                            key={`companyOpt${n}ForSelect${i}`}
                            onClick={() => {
                              setassesmentProblemList([
                                ...assesmentProblemList.map((val, ind) => {
                                  if (ind === i) {
                                    const nVal: LeetQuestionOpt = { ...val };
                                    nVal.dataset = datasetNameVal;
                                    return nVal;
                                  }
                                  return val;
                                }),
                              ]);
                            }}
                          >
                            {datasetNameVal}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={tableStyles.selectColDiv}>
                      <label htmlFor={`AssesmentDifficultySelection${i}`}>
                        Difficulty
                      </label>
                      <select
                        name={`AssesmentDifficultySelection${i}`}
                        id={`AssesmentDifficultySelection${i}`}
                        value={assesmentProblemList[i].difficulty}
                        onChange={() => {}}
                      >
                        {difficultyOpts.map((difficultyNameVal, n) => (
                          <option
                            key={`difficultyOpt${n}ForSelect${i}`}
                            onClick={() => {
                              setassesmentProblemList([
                                ...assesmentProblemList.map((val, ind) => {
                                  if (ind === i) {
                                    const nVal: LeetQuestionOpt = { ...val };
                                    nVal.difficulty = difficultyNameVal;
                                    return nVal;
                                  }
                                  return val;
                                }),
                              ]);
                            }}
                          >
                            {difficultyNameVal}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        const firstHalf = assesmentProblemList.slice(0, i);
                        const secondHalf = assesmentProblemList.slice(i + 1);
                        setassesmentProblemList([...firstHalf, ...secondHalf]);
                      }}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <div id={tableStyles.numQuestionsInput}>
                <label htmlFor="assessmentDuration">How many minutes?</label>
                <input
                  name="assessmentDuration"
                  type={"number"}
                  min={5}
                  max={150}
                  defaultValue={105}
                  onChange={(e) => {
                    const timeInt = parseInt(e.target.value);
                    if (timeInt === NaN) {
                      return;
                    }
                    setassessmentTimer(parseInt(e.target.value));
                  }}
                ></input>
              </div>
              <div id={tableStyles.assessmentButtonDiv}>
                <button
                  onClick={() => {
                    if (assesmentProblemList.length >= 10) {
                      return;
                    }
                    setassesmentProblemList([
                      ...assesmentProblemList,
                      singleQuestionOpt,
                    ]);
                  }}
                >
                  Add Question
                </button>
                {/* <button
                onClick={() => {
                  setassesmentProblemList([
                    ...assesmentProblemList.map((val) => {
                      return singleQuestionOpt;
                    }),
                  ]);
                }}
              >
                Reset All
              </button> */}
                <button
                  onClick={() => {
                    if (assessmentStarted) {
                      const problemList = findFunc(assesmentProblemList);
                      clearInterval(intervalId);
                      setassessmentTimer((prev) => 0);
                      const ary = [];
                      for (let i = 0; i < problemList.length; i++) {
                        const problemYTLinks = ytLinks.find((val) => {
                          return val.title === problemList[i].title;
                        });
                        if (problemYTLinks === undefined) {
                          continue;
                        }
                        ary.push(problemYTLinks.links);
                      }
                      setVidList(ary);

                      return;
                    }
                    const problemList = findFunc(assesmentProblemList);
                    setproblemList([...problemList]);
                    setassessmentStarted(true);
                    const timePrev = new Date();
                    const intId = setInterval(() => {
                      //Note: Timer slightly off, but shouldn't matter
                      //Probably only off bcuz of getTime/event loop weirdness
                      if (
                        new Date().getTime() - timePrev.getTime() >=
                        assessmentTimer * 60 * 1000
                      ) {
                        clearInterval(intervalId);
                        setassessmentTimer((prev) => prev - 1);
                        const ary = [];
                        for (let i = 0; i < problemList.length; i++) {
                          const problemYTLinks = ytLinks.find((val) => {
                            return val.title === problemList[i].title;
                          });
                          if (problemYTLinks === undefined) {
                            continue;
                          }
                          ary.push(problemYTLinks.links);
                        }
                        setVidList(ary);

                        return;
                      }

                      setassessmentTimer((prev) => prev - 1);
                    }, 1000 * 60);
                    setIntervalId(intId);
                  }}
                >
                  {assessmentStarted ? "Stop Assessment" : "Create Assessment"}
                </button>
              </div>
              <div id={tableStyles.clockDiv}>
                {clockRender(assessmentStarted, assessmentTimer)}
              </div>
              <div id={tableStyles.preTableSpaceDiv}></div>
            </div>
          </details>
        </div>
        <table id={tableStyles.table}>
          <thead>
            <tr>
              <TableHead
                sortFunc={compareNumber}
                currentList={problemList}
                setCurrentList={setproblemList}
                setSortOption={setsortOption}
                sortOption={sortOption as SortOption}
                headText="Number"
              />
              <TableHead
                sortFunc={compareDifficulties}
                currentList={problemList}
                setCurrentList={setproblemList}
                setSortOption={setsortOption}
                sortOption={sortOption as SortOption}
                headText="Difficulty"
              />
              <TableHead
                sortFunc={compareTitles}
                currentList={problemList}
                setCurrentList={setproblemList}
                setSortOption={setsortOption}
                sortOption={sortOption as SortOption}
                headText="Name"
              />
              <TableHead
                sortFunc={compareLikes}
                currentList={problemList}
                setCurrentList={setproblemList}
                setSortOption={setsortOption}
                sortOption={sortOption as SortOption}
                headText="Likes"
              />
              <TableHead
                sortFunc={compareDislikes}
                currentList={problemList}
                setCurrentList={setproblemList}
                setSortOption={setsortOption}
                sortOption={sortOption as SortOption}
                headText="Dislikes"
              />
              <TableHead
                sortFunc={comparePercentLiked}
                currentList={problemList}
                setCurrentList={setproblemList}
                setSortOption={setsortOption}
                sortOption={sortOption as SortOption}
                headText="Percent Liked"
              />
            </tr>
          </thead>
          <tbody id={tableStyles.tbody}>
            {problemList.map((val, i) => {
              if (val.title === "None") {
                return null;
              }
              return (
                <QuestionTableRow
                  key={`QuestionNum${i}`}
                  question={val}
                  number={i + 1}
                />
              );
            })}
          </tbody>
        </table>
        <div id="youtubeVids">
          {vidList.map((vidLinkList, i) => (
            <div key={`VidColNum${i}`}>
              <h4>{problemList[i].title}</h4>
              <div className={tableStyles.vidLinkRow} key={`VidRowNum${i}`}>
                {vidLinkList.map((val: any, i: number) => (
                  <VidLink
                    vidTitle={val.vidTitle}
                    vidLink={val.link}
                    key={`VidNum${i}`}
                  ></VidLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p id={tableStyles.helpfulNoteBottom}>
          Note: premium questions have been removed, which is why the blind 75
          only has 70 questions.
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://personal2-1.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Daniel Felsenthal
        </a>
      </footer>
    </div>
  );
};

export default Home;
