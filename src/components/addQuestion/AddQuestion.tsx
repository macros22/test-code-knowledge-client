import React from "react";
// import { Button } from "../Button/Button";
// import { EditMedicationItemProps } from "./EditMedicationItem.props";
import styles from "./AddQuestion.module.scss";
// import { Divider } from "../Divider/Divider";
// import axios from "axios";
import cn from "clsx";
// import WithLabel from "../WithLabel/WithLabel";
// import Tag from "../Tag/Tag";
// import { Input } from "../Input/Input";
import * as yup from "yup";
import { ValidationError } from "yup";
import { AddQuestionProps } from "./AddQuestion.props";
import axios from "axios";
import { Input } from "components/input/Input";
import { Divider } from "components/divider/Divider";
import { Textarea } from "components/textarea/Textarea";
import { Button } from "components/button/Button";
import { Answer, Question } from "interfaces/questions.interface";
import { Checkbox } from "components/checkbox/Checkbox";
// import { PATCH_ITEM_URL, POST_ITEM_URL } from "../../constants/url";

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

interface UserAnswer {
  answer: string;
  isChecked: boolean;
}

const schema = yup.object().shape({
  question: yup.string().required("Write question."),
  description: yup.string().required("Write medication description."),
  destinationCount: yup.number().required().positive().integer(),
});

export const AddQuestion = ({
  // item,
  // mode,
  setIsModalOpen,
}: AddQuestionProps): JSX.Element => {
  const [question, setQuestion] = React.useState<string>(
    exampleQuestion.question
  );
  const [questionError, setQuestionError] = React.useState<string>("");

  const [codeExample, setCodeExample] = React.useState<string>(
    exampleQuestion.codeExample
  );
  const [codeExampleError, setCodeExampleError] = React.useState<string>("");

  const initialAnswers = exampleQuestion.answersList.map((answer) => ({
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
    // setDestinationCountError("");
  };

  // const isValidForm = async () => {
  //   resetErrors();
  //   let isValid = true;

  //   try {
  //     await schema.validate({
  //       name,
  //       description,
  //       destinationCount,
  //     });
  //   } catch (error) {
  //     if (error instanceof ValidationError) {
  //       isValid = false;
  //       console.log(error.path);
  //       switch (error.path) {
  //         case "name":
  //           setNameError(error.errors[0]);
  //           break;
  //         case "description":
  //           setDescriptionError(error.errors[0]);
  //           break;
  //         case "destinationCount":
  //           setDestinationCountError(error.errors[0]);
  //           break;
  //       }
  //     }
  //   }

  //   return isValid;
  // };

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
    // if (await isValidForm()) {
    //   switch (mode) {
    //     case "add":
    //       postItem();
    //       break;

    //     case "edit":
    //       patchItem();
    //       break;
    //   }
    // }
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
          {/* <Divider className={styles.divider} /> */}
        </div>

        <div className={styles.codeExample}>
          <Textarea
            className={styles.textareaCodeExample}
            value={codeExample}
            name="Code example"
            errorMessage={codeExampleError}
            onChange={(e) => setCodeExample(e.target.value)}
          />

          {/* <Divider className={styles.divider} /> */}
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
                  checked={answers[index].isChecked}
                  onChange={() =>
                    setAnswers((answers) => {
                      // Deep copy.
                      const updatedAnswers = JSON.parse(
                        JSON.stringify(answers)
                      );
                      updatedAnswers[index].isChecked = !updatedAnswers[index].isChecked;
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
