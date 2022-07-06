import React from "react";

import styles from "./QuestionCard.module.scss";

import cn from "clsx";

import { QuestionCardProps } from "./QuestionCard.props";


import { ButtonIcon, Code, Divider } from "components";
import { useDeleteQuestionMutation } from "store/questions.api";


export const QuestionCard = ({
  question,
  handleEditButton,
  withEdit = false,
}: QuestionCardProps): JSX.Element => {


  const [deleteQuestion, {isError}] = useDeleteQuestionMutation();
  const handleDeleteButton = async () => {
    await deleteQuestion(question.id);
 
  };


  return (
    <div className={styles.wrapper}>
      {withEdit && (
        <div className={styles.changeQuestionButton}>
          <ButtonIcon
            icon="edit"
            appearance="white"
            onClick={handleEditButton}
          ></ButtonIcon>

          <ButtonIcon
            icon="deleteIcon"
            appearance="white"
            onClick={handleDeleteButton}
          ></ButtonIcon>
        </div>
      )}

      <div className={styles.questionCard}>
        <div className={styles.question}>
          <h4 >{question.question}</h4>
          <Divider className={styles.divider} />
        </div>

        <div className={styles.codeExample}>
          <Code codeExample={question.codeExample} />
        </div>
      </div>
    </div>
  );
};
