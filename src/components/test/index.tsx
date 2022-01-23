import React from "react";
import styles from './test.module.scss';
import Code from '../code';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeCheckedState, decrementCurrentQuestion, incrementCurrentQuestion, selectCheckedAnswers, selectCurrentQuestion, selectQuestions } from './testSlice';
import Checkbox from '../checkbox';
import { useRouter } from 'next/dist/client/router';


export const answers = [
    "[object]", "[null]", "[undefined]", "Error"
];


interface IProps {
    answers: string[];
}

const AnswersList: React.FC<IProps> = ({ answers }) => {

    const currentQuestion = useAppSelector(selectCurrentQuestion)

    const checkedState = (useAppSelector(selectCheckedAnswers))[currentQuestion];

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        console.log("checkedState:", checkedState)
    }, [checkedState])

    const handleOnChange = (position: number) => {

        console.log(position)
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        dispatch(changeCheckedState({ questionNumber: currentQuestion, answerNumber: position }))


    };

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
                            onChange={() => handleOnChange(index)} />
                    </li>
                );
            })}
            {/* </ol> */}
        </>
    );
}



const Test: React.FC = () => {

    const router = useRouter()

    const questions = useAppSelector(selectQuestions);
    const currentQuestion = useAppSelector(selectCurrentQuestion);
    const initQuestionsStatus = new Array(questions.length).fill(false);
    initQuestionsStatus[currentQuestion] = true;
    const [questionsStatus, setQuestionsStatus] = React.useState<boolean[]>(initQuestionsStatus);

    const dispatch = useAppDispatch()

    const [isActiveNextBtn, setIsActiveNextBtn] = React.useState<boolean>(false)

    const checkedState = (useAppSelector(selectCheckedAnswers))[currentQuestion];

    React.useEffect(() => {
        (checkedState.indexOf(true) !== -1)
            ? setIsActiveNextBtn(true)
            : setIsActiveNextBtn(false)


    }, [checkedState])


    // Handlers.
    const backButtonHandler = () => {
        if (currentQuestion > 0) {
            dispatch(decrementCurrentQuestion())
        }
    }

    const nextButtonHandler = () => {
        if ((currentQuestion < questions.length - 1)
            && (checkedState.indexOf(true) !== -1)) {
            const tmp = [...questionsStatus]
            tmp[currentQuestion + 1] = true;
            setQuestionsStatus(tmp);

            setIsActiveNextBtn(false)

            dispatch(incrementCurrentQuestion())
        }
    }

    const endTestHandler = () => {
        router.push("testResult")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.questionNumbers}>
                {questions.map((_, index) => {
                    let spanStyle = '';
                    if (currentQuestion == index) {
                        spanStyle = styles.currentItem;
                    } else if (currentQuestion < index) {
                        spanStyle = styles.nextItem;
                    }

                    return (
                        <span className={spanStyle} key={index ** 2}>{index}</span>
                    );
                })}
            </div>
            <div className={styles.content}>
                <h2 className={styles.questionTitle}>{questions[currentQuestion].question}</h2>
                <Code exampleCode={questions[currentQuestion].exampleCode} />

                <AnswersList answers={questions[currentQuestion].answersList} />
            </div>
            <div className={styles.buttons}>
                {/* <button onClick={backButtonHandler}>Назад</button> */}
                {currentQuestion < (questions.length - 1)
                    ? <button disabled={!isActiveNextBtn} onClick={nextButtonHandler}>Дальше</button>
                    : <button disabled={!isActiveNextBtn} onClick={endTestHandler}>Закончить тест</button>
                }

            </div>

        </div>
    )
}

export default Test;


