import React from "react";

import styles from "./QuestionForm.module.scss";

import cn from "clsx";

import * as yup from "yup";
import { ValidationError } from "yup";

import axios from "axios";
import { Input } from "components/atoms/input/Input";
import { Divider } from "components/atoms/divider/Divider";
import { Textarea } from "components/atoms/textarea/Textarea";
import { Button } from "components/atoms/button/Button";
import { Question } from "interfaces/questions.interface";
import { Checkbox } from "components/atoms/checkbox/Checkbox";
import { patchQuestion, postQuestion } from "helpers/api-requests";
import { QuestionFormProps } from "./QuestionForm.props";
// import { PATCH_ITEM_URL, POST_ITEM_URL } from "../../constants/url";

interface UserAnswer {
  answer: string;
  isChecked: boolean;
}

const schema = yup.object().shape({
  question: yup.string().required("Write question."),
  codeExample: yup.string().required("Write code example."),
  answers: yup.array().of(
    yup.object().shape({
      answer: yup.string().required("Write answer."),
      isChecked: yup.boolean(),
    })
  ),
});

export const QuestionForm = ({
  questionItem,
  mode,
  setIsModalOpen,
}: QuestionFormProps): JSX.Element => {
  const [question, setQuestion] = React.useState<string>(questionItem.question);
  const [questionError, setQuestionError] = React.useState<string>("");

  const [codeExample, setCodeExample] = React.useState<string>(
    questionItem.codeExample
  );
  const [codeExampleError, setCodeExampleError] = React.useState<string>("");

  const initialAnswers = questionItem.answersList.map((answer) => ({
    answer: answer.answer,
    isChecked: answer.isCorrect,
  }));
  const [answers, setAnswers] = React.useState<UserAnswer[]>(initialAnswers);
  const [answersErrors, setAnswersErrors] = React.useState<string[]>(
    new Array(questionItem.answersList.length).fill("")
  );

  const resetErrors = () => {
    setQuestionError("");
    setCodeExampleError("");
    // setAnswersErrors((array) => array.fill(""));
    setAnswersErrors(new Array(questionItem.answersList.length).fill(""));
  };

  const isValidForm = async () => {
    resetErrors();
    let isValid = true;

    try {
      await schema.validate({
        question,
        codeExample,
        answers,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        isValid = false;
        console.log(error.path);
        if (error.path == "question") {
          setQuestionError(error.errors[0]);
        } else if (error.path == "codeExample") {
          setCodeExampleError(error.errors[0]);
        } else if (error.path?.endsWith(".answer")) {
          // ! TO DO: Refactore this block.
          const errorIndex =
            Number(error.path.match(/\d/g)?.join(""));

          if (errorIndex >= 0) {
            setAnswersErrors((array) => {
              const updatedArray = [...array];
              updatedArray[errorIndex] = (error as ValidationError).errors[0];
              return updatedArray;
            });
          }
        }
      }
    }

    return isValid;
  };


  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
  

    const questionPayload = {
      question,
      codeExample,
      answersList: answers.map((answer) => ({
        answer: answer.answer,
        isCorrect: answer.isChecked,
      })),
    } as Omit<Question, "id">;

    if (await isValidForm()) {
      switch (mode) {
        case "add":
          try {
            await postQuestion(questionPayload);

            setIsModalOpen(false);
          } catch (error) {
            console.log(error);
          }

          break;

        case "edit":
          try {
            await patchQuestion(questionPayload, questionItem.id.toString());

            setIsModalOpen(false);
          } catch (error) {
            console.log(error);
          }
          break;
      }
    }
  };

  const handleResetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // setName(item.name);
    // setDescription(item.description);
    // setCount(item.count);
    // setDestinationCount(item.destinationCount);
  };

  
  // React.useEffect(() => {
  //   console.log(answers);
  // }, [JSON.parse(JSON.stringify(answers))]);

  return (
    <>
      <form className={styles.editMedicalItem} onSubmit={handleSubmitForm}>
        <div className={styles.question}>
          <Input
            value={question}
            name="Question"
            errorMessage={questionError}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Divider className={styles.divider} />
        </div>

        <div className={styles.codeExample}>
          <Textarea
            className={styles.textareaCodeExample}
            value={codeExample}
            name="Code example"
            errorMessage={codeExampleError}
            onChange={(e) => setCodeExample(e.target.value)}
          />

          <Divider className={styles.divider} />
        </div>

        <div className={styles.answersList}>
          {answers.map((answer, index) => {
            return (
              <div key={index} className={styles.answer}>
                <Input
                  value={answers[index].answer}
                  name={`Answer № ${index + 1}`}
                  errorMessage={answersErrors[index]}
                  onChange={(e) => {
                    e.preventDefault();
                    setAnswers((answers) => {
                      // Deep copy.
                      const updatedAnswers = JSON.parse(
                        JSON.stringify(answers)
                      );
                      updatedAnswers[index].answer = e.target.value;
                      return updatedAnswers;
                    });
                  }}
                />
                <Checkbox
                  name="Is correct?"
                  checked={answers[index].isChecked}
                  onChange={() =>
                    setAnswers((answers) => {
                      // Deep copy.
                      const updatedAnswers = JSON.parse(
                        JSON.stringify(answers)
                      );
                      updatedAnswers[index].isChecked =
                        !updatedAnswers[index].isChecked;
                      return updatedAnswers;
                    })
                  }
                />
              </div>
            );
          })}

          {/* <Divider className={styles.divider} /> */}
        </div>

        <Button className={styles.saveBtn} appearance="primary" type="submit">
          {mode == "add" ? "Add question" : "Save changes"}
        </Button>
        <Button
          className={styles.resetBtn}
          appearance="ghost"
          onClick={handleResetButton}
        >
          Reset
        </Button>
      </form>
    </>
  );
};
