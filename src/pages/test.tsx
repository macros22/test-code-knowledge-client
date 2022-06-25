import { getQuestionsAsync, selectQuestions } from "components/organisms/test/Test.slice";
import { withLayout } from "layouts/MainLayout";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";


import { Test } from '../components';

const TestPage: React.FC = () => {
    const questions = useAppSelector(selectQuestions);
    const dispatch = useAppDispatch();
    React.useEffect(() => {

        dispatch(getQuestionsAsync());
      }, []);
    return (
        <>
        {questions && questions.length &&
            <Test />
        }
        </>
    )
}


export default withLayout(TestPage);

