
import React from 'react';
import { Code } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Checkbox from '../checkbox';
import styles from "./test-result.module.scss"
import { changeUserCorrectAnswers, selectCheckedAnswers, selectQuestions } from '../test/testSlice';

interface IProps {
    answers: string[];
    currentQuestion: number;
}

const AnswersListResult: React.FC<IProps> = ({ answers, currentQuestion }) => {


    const checkedAnswers = (useAppSelector(selectCheckedAnswers))[currentQuestion];
    const correctAnswers = (useAppSelector(selectQuestions))[currentQuestion].correctAnswers;
    const answersList = (useAppSelector(selectQuestions))[currentQuestion].answersList;

    const dispatch = useAppDispatch()

    const checkCorrectAnswer = (index: number, isChecked: boolean) => {
        let result: boolean = false;
        isChecked
            ? result = correctAnswers.indexOf(answersList[index]) !== -1
            : result = correctAnswers.indexOf(answersList[index]) === -1


        if (!result) {
            dispatch(changeUserCorrectAnswers({ questionNumber: currentQuestion, isCorrect: false }))
        }
        return result
    }

    console.log(currentQuestion, "\n")
    console.log("checkedAnswers: ", checkedAnswers)
    console.log("correctAnswers: ", correctAnswers)
    console.log("answersList: ", answersList)

    return (
        <>
            {/* <ol className={styles.answersList}> */}
            {answers.map((answer, index) => {
                return (
                    <li className={styles.answersList} key={index ** 2}>
                        <Checkbox
                            name={answer}
                            value={answer}
                            checked={checkedAnswers[index]}
                            onChange={() => { }} />
                        {
                            checkCorrectAnswer(index, checkedAnswers[index])
                                ? <span className={styles.answerResultStatusCorrect}>Правильно</span>
                                : <span className={styles.answerResultStatusInCorrect}>Не правильно</span>
                        }

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
                                <hr className={styles.hrGray} />
                                <h3 className={styles.questionTitle}>{questions[index].question}</h3>
                                <Code exampleCode={questions[index].exampleCode} />

                                <AnswersListResult answers={questions[index].answersList} currentQuestion={index} />
                                <hr className={styles.hrHorizontalGradient} />

                            </React.Fragment>)


                    })}

                </div>
            </div>
        </>
    )
}

export default TestResult;