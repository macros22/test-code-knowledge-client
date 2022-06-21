import React from "react";
import styles from "./Test.module.scss";
import Code from "../code";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeCheckedState,
  decrementCurrentQuestion,
  getQuestionsAsync,
  incrementCurrentQuestion,
  selectCheckedAnswers,
  selectCurrentQuestion,
  selectQuestions,
} from "./Test.slice";
import { Checkbox } from "../checkbox/Checkbox";
import { useRouter } from "next/dist/client/router";
import { Button } from "../button/Button";
import { Divider } from "../divider/Divider";

export const answers = ["[object]", "[null]", "[undefined]", "Error"];

interface IProps {
  answers: string[];
}

const AnswersList: React.FC<IProps> = ({ answers }) => {
  const currentQuestion = useAppSelector(selectCurrentQuestion);

  const checkedAnswers = useAppSelector(selectCheckedAnswers)[currentQuestion];

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log("checkedAnswers:", checkedAnswers);
  }, [checkedAnswers]);

  const handleOnChange = (position: number) => {
    dispatch(
      changeCheckedState({
        questionNumber: currentQuestion,
        answerNumber: position,
      })
    );
  };

  return (
    <>
      {answers.map((answer, index) => {
        return (
          <li className={styles.answersList} key={index ** 2}>
            <Checkbox
              name={answer}
              value={answer}
              checked={checkedAnswers[index]}
              onChange={() => handleOnChange(index)}
            />
          </li>
        );
      })}
    </>
  );
};

const Test: React.FC = () => {
  const router = useRouter();

  const questions = useAppSelector(selectQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const initQuestionsStatus = new Array(questions.length).fill(false);
  initQuestionsStatus[currentQuestion] = true;
  const [questionsStatus, setQuestionsStatus] =
    React.useState<boolean[]>(initQuestionsStatus);

  const dispatch = useAppDispatch();

  const [isActiveNextBtn, setIsActiveNextBtn] = React.useState<boolean>(false);

  const checkedState = useAppSelector(selectCheckedAnswers)[currentQuestion];

  React.useEffect(() => {
    checkedState.indexOf(true) !== -1
      ? setIsActiveNextBtn(true)
      : setIsActiveNextBtn(false);
  }, [checkedState]);

  React.useEffect(() => {
    dispatch(getQuestionsAsync());
  }, []);

  // Handlers.
  const backButtonHandler = () => {
    if (currentQuestion > 0) {
      dispatch(decrementCurrentQuestion());
    }
  };

  const nextButtonHandler = () => {
    if (
      currentQuestion < questions.length - 1 &&
      checkedState.indexOf(true) !== -1
    ) {
      const tmp = [...questionsStatus];
      tmp[currentQuestion + 1] = true;
      setQuestionsStatus(tmp);

      setIsActiveNextBtn(false);

      dispatch(incrementCurrentQuestion());
    }
  };

  const endTestHandler = () => {
    router.push("/testResult");
  };

  return (
    <>
      {questions.length && (
        <div className={styles.wrapper}>
          <div className={styles.questionNumbers}>
            {questions.map((_, index) => {
              let spanStyle = "";
              if (currentQuestion == index) {
                spanStyle = styles.currentItem;
              } else if (currentQuestion < index) {
                spanStyle = styles.nextItem;
              }

              return (
                <span className={spanStyle} key={index ** 2}>
                  {index}
                </span>
              );
            })}
          </div>
          <div className={styles.content}>
            <h2 className={styles.questionTitle}>
              {questions[currentQuestion].question}
            </h2>
            <Divider />
            <Code exampleCode={questions[currentQuestion].exampleCode} />

            <AnswersList answers={questions[currentQuestion].answersList} />
          </div>
          <div className={styles.buttons}>
            {/* <button onClick={backButtonHandler}>Назад</button> */}
            {currentQuestion < questions.length - 1 ? (
              // ? <Button appearance={isActiveNextBtn ? "primary" : "disabled"}  onClick={nextButtonHandler}>Next</Button>
              // : <Button appearance={isActiveNextBtn ? "primary" : "disabled"} onClick={endTestHandler}>Finish test</Button>
              <Button appearance={"primary"} onClick={nextButtonHandler}>
                Next
              </Button>
            ) : (
              <Button appearance={"primary"} onClick={endTestHandler}>
                Finish test
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
