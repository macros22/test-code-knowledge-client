// import { Question } from "components/organisms/question/Question";
import { Button } from "components/atoms/button/Button";
import Modal from "components/atoms/modal/Modal";
import React from "react";
import { Question } from "interfaces/questions.interface";

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