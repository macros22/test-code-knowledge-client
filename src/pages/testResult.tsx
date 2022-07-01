import { withLayout } from "layouts/MainLayout";
import React from "react";

import { TestResult } from "components";

const TestResultPage: React.FC = () => {
  return (
    <>
      <TestResult />
    </>
  );
};

export default withLayout(TestResultPage);
