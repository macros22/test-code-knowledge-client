import styles from "./QuestionsList.module.css";
import axios from "axios";

import React from "react";

import { Question } from "interfaces/questions.interface";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getQuestionsAsync, selectQuestions } from "../test/Test.slice";
import { Button } from "components/atoms/button/Button";
import { Card } from "components/atoms/card/Card";
import { QuestionCard } from "../questionCard/QuestionCard";
import Modal from "components/atoms/modal/Modal";
import { QuestionForm } from "../questionForm/QuestionForm";

const exampleQuestion: Question = {
  id: 9999,
  question: "Example question",
  codeExample: `
  const example = () => {
    return ExampleCode;
  }
  `,
  answersList: [
    { answer: "first", isCorrect: true },
    { answer: "second", isCorrect: false },
    { answer: "third", isCorrect: false },
    { answer: "fourth", isCorrect: false },
    // { answer: "firsgt", isCorrect: true },
    // { answer: "secdond", isCorrect: false },
    // { answer: "thibdrd", isCorrect: false },
    // { answer: "foudbfrth", isCorrect: false },
    // { answer: "firdfbst", isCorrect: true },
    // { answer: "secondbfd", isCorrect: false },
    // { answer: "thibsvdfrd", isCorrect: false },
    // { answer: "fousdvdfbrth", isCorrect: false },
    // { answer: "firafgnscsbst", isCorrect: true },
    // { answer: "secascond", isCorrect: false },
    // { answer: "thdfbird", isCorrect: false },
    // { answer: "founfrth", isCorrect: false },
  ],
};

export const QuestionsList = (): JSX.Element => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  // const [questions, setQuestions] = React.useState<Question[] | null>(null);

  const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);
  const [isEditQuestionMode, setIsEditQuestionMode] = React.useState(false);

  const handleAddQuestionButton = () => {
    setIsAddQuestionMode(true);
  };

  const makeHandleEditButton = (index: number) => {
    return () => {
      setCurrentQuestionIndex(index);
      setIsEditQuestionMode(true);
      getQuestions();
    };
  };

  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async function () {
      await getQuestions();
    })();
  }, []);

  const getQuestions = async () => {
    try {
      dispatch(getQuestionsAsync());
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  React.useEffect(() => {
    (async function () {
      await getQuestions();
    })();
  }, []);

  React.useEffect(() => {
    (async function () {
      await getQuestions();
    })();
  }, [isEditQuestionMode, isAddQuestionMode]);

  return (
    <div className="wrapper">
      <div className={styles.title}>
        <h1>All questions</h1>

        <Button
          className={styles.addItemButton}
          appearance="ghost"
          onClick={handleAddQuestionButton}
        >
          Add question
        </Button>
      </div>
      {questions && questions.length ? (
        questions.map((question, index) => {
          return (
            <Card className={styles.question} key={question.id}>
              <QuestionCard
                updateQuestions={getQuestions}
                handleEditButton={makeHandleEditButton(index)}
                question={question}
                key={question.id}
              />
            </Card>
          );
        })
      ) : (
        <Card className={styles.item}>Empty medication list</Card>
      )}

      {isAddQuestionMode && (
        <Modal setIsModalOpen={setIsAddQuestionMode}>
          <QuestionForm
            questionItem={exampleQuestion}
            mode="add"
            setIsModalOpen={setIsAddQuestionMode}
          />
        </Modal>
      )}

      {questions && isEditQuestionMode && (
        <Modal setIsModalOpen={setIsEditQuestionMode}>
          <QuestionForm
            questionItem={questions[currentQuestionIndex]}
            mode="edit"
            setIsModalOpen={setIsAddQuestionMode}
          />
        </Modal>
      )}

      {/* {items && addItemMode && (
        <Modal setModalOpen={setAddItemMode}>
          <EditMedicationItem
            setModalOpen={setAddItemMode}
            mode="add"
            item={defaultItem}
          />
        </Modal>
      )} */}
    </div>
  );
};
