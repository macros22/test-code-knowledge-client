import React from "react";
import { QuestionsList } from "components/organisms/questionsList/QuestionsList";
import { withLayout } from "layouts/MainLayout";

const AdminPage = () => {
  return (
    <>
      <QuestionsList withEdit={true} />
    </>
  );
};

export default withLayout(AdminPage);
