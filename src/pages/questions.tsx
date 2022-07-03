import React from "react";
import { withLayout } from "layouts/MainLayout";
import { QuestionsList } from "components";

const QuestionsPage = () => {
  return (
    <>
      <QuestionsList />
    </>
  );
};

export default withLayout(QuestionsPage);
