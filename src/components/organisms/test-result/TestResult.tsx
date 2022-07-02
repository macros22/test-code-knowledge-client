import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Checkbox } from "../../atoms/checkbox/Checkbox";
import styles from "./TestResult.module.scss";
import {
  changeUserCorrectAnswers,
  resetState,
  selectCheckedAnswers,
  selectQuestions,
  selectUserAnswersStatus,
} from "../test/Test.slice";
import { Card } from "../../atoms/card/Card";
import { Button } from "../../atoms/button/Button";
import { useRouter } from "next/dist/client/router";
import { Divider } from "../../atoms/divider/Divider";
import Tag from "../../atoms/tag/Tag";
import cn from "clsx";
import { Code } from "components/molecules/code/Code";
import { Answer } from "interfaces/questions.interface";
interface IProps {
  answers: Answer[];
  currentQuestion: number;
}

const AnswersListResult: React.FC<IProps> = ({ answers, currentQuestion }) => {
  const checkedAnswers = useAppSelector(selectCheckedAnswers)[currentQuestion];
  // const correctAnswers =
  //   useAppSelector(selectQuestions)[currentQuestion].correctAnswers;
  const answersList =
    useAppSelector(selectQuestions)[currentQuestion].answersList;

  const dispatch = useAppDispatch();

  const getAnswerLabel = (index: number, isMarked: boolean) => {
    // 'correct' - answer marked and it`s correct.
    // 'error' - answer marked and it`s incorrect.
    // 'empty' - answer unmarked and it`s correct.
    // 'missing' - answer unmarked and it`s incorrect.
    let result: "correct" | "error" | "empty" | "missing" = "error";

    if (isMarked) {
      answersList[index].isCorrect ? (result = "correct") : (result = "error");
    } else {
      !answersList[index].isCorrect ? (result = "empty") : (result = "missing");
    }

    if (result === "error" || result === "missing") {
      dispatch(
        changeUserCorrectAnswers({
          questionNumber: currentQuestion,
          isCorrect: false,
        })
      );
    }
    switch (result) {
      case "error":
        return (
          <Tag className={styles.tag} color="error">
            Error
          </Tag>
        );
      case "correct":
        return (
          <Tag className={styles.tag} color="success">
            Correct
          </Tag>
        );
      case "missing":
        return (
          <Tag className={styles.tag} color="info">
            Missing correct
          </Tag>
        );
    }
  };

  // console.log(currentQuestion, '\n')
  // console.log('checkedAnswers: ', checkedAnswers)
  // console.log('correctAnswers: ', correctAnswers)
  // console.log('answersList: ', answersList)

  React.useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <>
      <div className={styles.answersList}>
        {answers.map((answer, index) => {
          return (
            <li className={styles.answer} key={answer.answer}>
              <Checkbox
                name={answer.answer}
                value={answer.answer}
                checked={checkedAnswers[index]}
                disabled
              />
              <div className={styles.tag}>
                {getAnswerLabel(index, checkedAnswers[index])}
              </div>
            </li>
          );
        })}
      </div>
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
          <h3>
            Correct answers:{" "}
            {
              userAnswersStatus.filter((answerStatus) => answerStatus === true)
                .length
            }{" "}
            from {userAnswersStatus.length}
          </h3>
          {questions.map((question, index) => {
            return (
              <Card
                className={cn(styles.card, {
                  [styles.successCard]: userAnswersStatus[index],
                  [styles.errorCard]: !userAnswersStatus[index],
                })}
                key={index + question.question}
              >
                <h2 className={styles.questionTitle}>Question № {index + 1}</h2>
                <Divider />
                <h3 className={styles.questionTitle}>
                  {questions[index].question}
                </h3>
                <Code codeExample={questions[index].codeExample} />

                <AnswersListResult
                  answers={questions[index].answersList}
                  currentQuestion={index}
                />
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
