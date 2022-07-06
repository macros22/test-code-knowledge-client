import React from "react";
import { withLayout } from "layouts/MainLayout";
import { QuestionsList } from "components";
import { useGetQuestionsQuery } from "store/questions.api";

const AdminPage = () => {
    const {data:questions = [], isLoading} = useGetQuestionsQuery('');
  return (
    <>
      <QuestionsList withEdit={true} questions={questions}/>
    </>
  );
};

export default withLayout(AdminPage);
