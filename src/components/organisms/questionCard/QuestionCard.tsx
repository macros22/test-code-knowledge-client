import React from "react";
// import { Button } from "../Button/Button";
// import { EditMedicationItemProps } from "./EditMedicationItem.props";
import styles from "./QuestionCard.module.scss";
// import { Divider } from "../Divider/Divider";
// import axios from "axios";
import cn from "clsx";
// import WithLabel from "../WithLabel/WithLabel";
// import Tag from "../Tag/Tag";
// import { Input } from "../Input/Input";
import * as yup from "yup";
import { ValidationError } from "yup";
// import { QuestionCardProps } from "./QuestionCard.props";
import axios from "axios";
import { Input } from "components/atoms/input/Input";
import { Divider } from "components/atoms/divider/Divider";
import { Textarea } from "components/atoms/textarea/Textarea";
import { Button } from "components/atoms/button/Button";
import { Question } from "interfaces/questions.interface";
import { Checkbox } from "components/atoms/checkbox/Checkbox";
import { patchQuestion, postQuestion } from "helpers/api-requests";
import { QuestionCardProps } from "./QuestionCard.props";
// import { PATCH_ITEM_URL, POST_ITEM_URL } from "../../constants/url";


interface UserAnswer {
  answer: string;
  isChecked: boolean;
}

const schema = yup.object().shape({
  question: yup.string().required("Write question."),
  codeExample: yup.string().required("Write code example."),
  // destinationCount: yup.number().required().positive().integer(),
});

export const QuestionCard = ({
  questionItem,
  mode,
  setIsModalOpen,
}: QuestionCardProps): JSX.Element => {
  const [question, setQuestion] = React.useState<string>(
    questionItem.question
  );
  const [questionError, setQuestionError] = React.useState<string>("");

  const [codeExample, setCodeExample] = React.useState<string>(
    questionItem.codeExample
  );
  const [codeExampleError, setCodeExampleError] = React.useState<string>("");

  const initialAnswers = questionItem.answersList.map((answer) => ({
    answer: answer.answer,
    isChecked: false,
  }));
  const [answers, setAnswers] = React.useState<UserAnswer[]>(initialAnswers);
  // const [destinationCount, setDestinationCount] = React.useState<number>(
  //   item.destinationCount
  // );
  // const [destinationCountError, setDestinationCountError] =
  //   React.useState<string>("");

  // const [count, setCount] = React.useState<number>(item.count);

  const resetErrors = () => {
    setQuestionError("");
    setCodeExampleError("");
  };

  const isValidForm = async () => {
    resetErrors();
    let isValid = true;

    try {
      await schema.validate({
        question,
        codeExample,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        isValid = false;
        console.log(error.path);
        switch (error.path) {
          case "question":
            setQuestionError(error.errors[0]);
            break;
          case "codeExample":
            setCodeExampleError(error.errors[0]);
            break;
        }
      }
    }

    return isValid;
  };

  // const postItem = async () => {
  //   const payload = {
  //     // name,
  //     // description,
  //     // destinationCount,
  //     // count,
  //   };

  //   try {
  //     const result = await axios.post(POST_ITEM_URL, payload, {
  //       withCredentials: true,
  //     });

  //     setModalOpen(false);
  //     setTimeout(async () => {
  //       alert("Item successfuly addded");
  //     }, 150);

  //   } catch (error) {
  //     if (error instanceof Error) {
  //       // setError(error.message);
  //     }
  //   }
  // };

  // const patchItem = async () => {
  //   const payload = {
  //     name,
  //     description,
  //     destinationCount,
  //     count,
  //   };

  //   try {
  //     const result = await axios.patch(PATCH_ITEM_URL + item.id, payload, {
  //       withCredentials: true,
  //     });
  //     console.log(result);

  //     setModalOpen(false);
  //     setTimeout(async () => {
  //       alert("Item successfuly changed");
  //     }, 150);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(codeExample);

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

  const handlePlusButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if (count < item.destinationCount) {
    //   setCount((count) => count + 1);
    // }
  };

  const handleMinusButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // if (count > 0) {
    //   setCount((count) => count - 1);
    // }
  };

  React.useEffect(() => {
    console.log(answers);
  }, [JSON.parse(JSON.stringify(answers))]);

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
              <div key={answer.answer} className={styles.answer}>
                <Input
                  value={answers[index].answer}
                  name={`Answer # ${index + 1}`}
                  // errorMessage={destinationCountError}
                  onChange={(e) =>
                    setAnswers((answers) => {
                      // Deep copy.
                      const updatedAnswers = JSON.parse(
                        JSON.stringify(answers)
                      );
                      updatedAnswers[index].answer = e.target.value;
                      return updatedAnswers;
                    })
                  }
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
          {/* {mode == "add" ? "Add" : "Save"} */}
          Add
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
