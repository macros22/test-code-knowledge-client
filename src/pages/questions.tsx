import React from "react";
import { QuestionsList } from "components/organisms/questionsList/QuestionsList";
import { withLayout } from "layouts/MainLayout";

const QuestionsPage = () => {
  return (
    <>
      <QuestionsList />
    </>
  );
};

export default withLayout(QuestionsPage);
