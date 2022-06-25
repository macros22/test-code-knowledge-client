// import { Question } from "components/organisms/question/Question";
import { Button } from "components/atoms/button/Button";
import Modal from "components/atoms/modal/Modal";
import React from "react";
import { Question } from "interfaces/questions.interface";

import { QuestionsList } from "components/organisms/questionsList/QuestionsList";




const QuestionsPage = () => {


    return (
        <div style={{width: "50%", margin: "0 auto"}}>
       <QuestionsList />
        </div>
    )
}

export default QuestionsPage;