import { AddQuestion } from "components/addQuestion/AddQuestion";
import { Button } from "components/button/Button";
import Modal from "components/modal/Modal";
import React from "react";


const QuestionsPage = () => {

    const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);

    const handleAddQuestionButton = () => {
        setIsAddQuestionMode(true);
    }

    return (
        <>
        <Button appearance="ghost" onClick={handleAddQuestionButton}>
            Add question
        </Button>

        {isAddQuestionMode && <Modal setIsModalOpen={setIsAddQuestionMode}>
           <AddQuestion setIsModalOpen={setIsAddQuestionMode}/></Modal>}
        </>
    )
}

export default QuestionsPage;