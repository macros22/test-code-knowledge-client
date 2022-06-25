import React from "react";

import styles from "./QuestionCard.module.scss";

import cn from "clsx";
import axios from "axios";
import { QuestionCardProps } from "./QuestionCard.props";
import { Code } from "components/molecules/code/Code";
import { Button } from "components/atoms/button/Button";
import { Divider } from "components/atoms/divider/Divider";
import { deleteQuestion } from "helpers/api-requests";

export const QuestionCard = ({
  question,
  updateQuestions,
  handleEditButton,
}: QuestionCardProps): JSX.Element => {
  // const [count, setCount] = React.useState<number>(question.count);
  // const debouncedCount = useDebounce<number>(count, 500);

  
  const handleDeleteButton = async () => {
    await deleteQuestion(question.id.toString());
    await updateQuestions();
  }


  // const patchquestion = async () => {
  //   const payload = {
  //     ...question,
  //     count,
  //   };

  //   try {
  //     const result = await axios.patch(PATCH_question_URL + question.id, payload, {
  //       withCredentials: true,
  //     });
  //     updateQuestions();
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   setCount(question.count);
  // }, [question.count]);

  // React.useEffect(() => {
  //   (async function () {
  //     if (count !== question.count) {
  //       patchItem();
  //     }
  //   })();
  // }, [debouncedCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.changeQuestionButton}>
        <Button appearance="ghost" onClick={() => handleEditButton()}>
          Change
        </Button>
        <Button appearance="ghost" onClick={() => handleDeleteButton()}>
          Delete
        </Button>
      </div>
      <div className={styles.questionCard}>
        <div className={styles.question}>
          <p className={styles.title}>{question.question}</p>
          <p className={styles.subTitle}>Question</p>
          <Divider className={styles.divider}/>
        </div>

        <div className={styles.codeExample}>
          <Code codeExample={question.codeExample} />
    
        </div>
        {/* <div className={styles.destinationCount}>
          <WithLabel labelText="Destination count">
            <Tag color="primary" size="lg" fullWidth>
              {item.destinationCount}
            </Tag>
          </WithLabel >
        </div>
        <div className={styles.count}>
          <WithLabel labelText="Count">
            <Tag color="primary" size="lg" fullWidth>
              {count}
            </Tag>
          </WithLabel>
        </div>
        <WithLabel className={styles.buttons} labelText="Change count">
          <Button
            appearance={
              item.destinationCount !== count ? "primary" : "disabled"
            }
            className={styles.button}
            onClick={handlePlusButton}
          >
            +
          </Button>

          <Button
             appearance={
              count !== 0 ? "primary" : "disabled"
            }
            className={cn(styles.button, styles.lastButton)}
            onClick={handleMinusButton}
          >
            -
          </Button>
        </WithLabel> */}
      </div>
    </div>
  );
};
