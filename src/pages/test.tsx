import React from "react";
import { withLayout } from "layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Test } from "components";
import { getQuestionsAsync, selectQuestions } from "store/reducers/Test.slice";

const TestPage: React.FC = () => {
  const questions = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getQuestionsAsync());
  }, []);
  return <>{questions && questions.length && <Test />}</>;
};

export default withLayout(TestPage);
