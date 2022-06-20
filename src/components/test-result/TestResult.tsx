import React from "react";
import { Code } from "..";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Checkbox from "../checkbox";
import styles from "./TestResult.module.scss";
import {
  changeUserCorrectAnswers,
  resetState,
  selectCheckedAnswers,
  selectQuestions,
  selectUserAnswersStatus,
} from "../test/Test.slice";
import { Card } from "../card/Card";
import { Button } from "../button/Button";
import { useRouter } from "next/dist/client/router";

interface IProps {
  answers: string[];
  currentQuestion: number;
}

const AnswersListResult: React.FC<IProps> = ({ answers, currentQuestion }) => {
  const checkedAnswers = useAppSelector(selectCheckedAnswers)[currentQuestion];
  const correctAnswers =
    useAppSelector(selectQuestions)[currentQuestion].correctAnswers;
  const answersList =
    useAppSelector(selectQuestions)[currentQuestion].answersList;

  const dispatch = useAppDispatch();

  const getAnswerLabel = (index: number, isChecked: boolean) => {
    // let result: boolean = false;
    let result: "correct" | "error" | "empty" = "correct";

    if (isChecked) {
      correctAnswers.indexOf(answersList[index]) !== -1
        ? (result = "correct")
        : (result = "error");
    } else {
      correctAnswers.indexOf(answersList[index]) === -1
        ? (result = "empty")
        : (result = "error");
    }

    if (result === "error" || result === "empty") {
      dispatch(
        changeUserCorrectAnswers({
          questionNumber: currentQuestion,
          isCorrect: false,
        })
      );
    }
    // return result
    switch (result) {
      case "error":
        return (
          <span className={styles.answerResultStatusInCorrect}>Error</span>
        );
      case "correct":
        return (
          <span className={styles.answerResultStatusCorrect}>Correct</span>
        );
    }
  };

  // console.log(currentQuestion, "\n")
  // console.log("checkedAnswers: ", checkedAnswers)
  // console.log("correctAnswers: ", correctAnswers)
  // console.log("answersList: ", answersList)

  return (
    <>
      {/* <ol className={styles.answersList}> */}
      {answers.map((answer, index) => {
        return (
          <li className={styles.answersList} key={index ** 2}>
            <Checkbox
              name={answer}
              value={answer}
              checked={checkedAnswers[index]}
              onChange={() => {}}
            />
            {getAnswerLabel(index, checkedAnswers[index])}
          </li>
        );
      })}
      {/* </ol> */}
    </>
  );
};

const TestResult: React.FC = () => {
  const questions = useAppSelector(selectQuestions);
  const userAnswersStatus = useAppSelector(selectUserAnswersStatus);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const newTestButtonHandler = () => {
    dispatch(resetState());
    router.push("/test");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1>
            Правильных ответов:{" "}
            {
              userAnswersStatus.filter((answerStatus) => answerStatus === true)
                .length
            }
            из {userAnswersStatus.length}
          </h1>
          {questions.map((_, index) => {
            return (
              <Card className={styles.card} key={index}>
                <h2 className={styles.questionTitle}>Вопрос № {index + 1}</h2>
                <hr className={styles.hrGray} />
                <h3 className={styles.questionTitle}>
                  {questions[index].question}
                </h3>
                <Code exampleCode={questions[index].exampleCode} />

                <AnswersListResult
                  answers={questions[index].answersList}
                  currentQuestion={index}
                />
                <hr className={styles.hrHorizontalGradient} />
              </Card>
            );
          })}
          <Button appearance="primary" onClick={newTestButtonHandler}>
            New test
          </Button>
        </div>
      </div>
    </>
  );
};

export default TestResult;
