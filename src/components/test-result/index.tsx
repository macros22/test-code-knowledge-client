
import React from 'react';
import { Code } from '..';
import { useAppSelector } from '../../app/hooks';
import Checkbox from '../checkbox';
import styles from "../test/test.module.scss"
import { selectCheckedAnswers, selectQuestions } from '../test/testSlice';

interface IProps {
    answers: string[];
    currentQuestion: number;
}

const AnswersListResult: React.FC<IProps> = ({ answers, currentQuestion }) => {


    const checkedState = (useAppSelector(selectCheckedAnswers))[currentQuestion];


    React.useEffect(() => {
        console.log("checkedState:", checkedState)
    }, [checkedState])


    return (
        <>
            {/* <ol className={styles.answersList}> */}
            {answers.map((answer, index) => {
                return (
                    <li className={styles.answersList} key={index ** 2}>
                        <Checkbox
                            name={answer}
                            value={answer}
                            checked={checkedState[index]}
                            onChange={() => { }} />
                        <span className={styles.answerResultStatus}> Правильный ответ</span>
                    </li>
                );
            })}
            {/* </ol> */}
        </>
    );
}



const TestResult: React.FC = () => {
    const questions = useAppSelector(selectQuestions);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    {questions.map((_, index) => {
                        return (
                            <React.Fragment key={index}>
                                <h2 className={styles.questionTitle}>Вопрос № {index + 1}</h2>
                                <h3 className={styles.questionTitle}>{questions[index].question}</h3>
                                <Code exampleCode={questions[index].exampleCode} />

                                <AnswersListResult answers={questions[index].answersList} currentQuestion={index} />
                                <br />
                            </React.Fragment>)


                    })}

                </div>
            </div>
        </>
    )
}

export default TestResult;