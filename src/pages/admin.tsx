import React from "react";
import { withLayout } from "layouts/MainLayout";
import { QuestionsList } from "components";

const AdminPage = () => {
  return (
    <>
      <QuestionsList withEdit={true} />
    </>
  );
};

export default withLayout(AdminPage);
