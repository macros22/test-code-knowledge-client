// import { Question } from "components/organisms/question/Question";
import { Button } from "components/atoms/button/Button";
import Modal from "components/atoms/modal/Modal";
import React from "react";
import { Question } from "interfaces/questions.interface";
import { QuestionCard } from "components/organisms/questionCard/QuestionCard";

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
    ],
  };


const QuestionsPage = () => {

    const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);

    const handleAddQuestionButton = () => {
        setIsAddQuestionMode(true);
    }

    return (
        <>
        <Button appearance="ghost" onClick={handleAddQuestionButton}>
            Add question
        </Button>

        {isAddQuestionMode && <Modal setIsModalOpen={setIsAddQuestionMode}>
           <QuestionCard questionItem={exampleQuestion} mode="add" setIsModalOpen={setIsAddQuestionMode}/></Modal>}
        </>
    )
}

export default QuestionsPage;