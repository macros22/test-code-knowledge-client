import React from "react";
import styles from './test.module.scss';
import Code from '../code';


const question = "Что будет выведено в консоль?"

export const answers = [
    "[object]", "[null]", "[undefined]", "Error"
];


interface IProps {
    answers: string[];
}

const Answers: React.FC<IProps> = ({ answers }) => {
    const [checkedState, setCheckedState] = React.useState<boolean[]>(
        new Array(answers.length).fill(false)
    );

    React.useEffect(() => {
        console.log(checkedState)
    }, checkedState)

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    return (
        <>
            {/* <ol className={styles.answersList}> */}
            {answers.map((answer, index) => {
                return (
                    <li className={styles.answersList} key={index ** 2}>
                        <label className={styles.checkField}>
                            <input
                                type="checkbox"
                                name={answer}
                                value={answer}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                            />{answer}</label>
                    </li>
                );
            })}
            {/* </ol> */}
        </>
    );
}

//////////////////////


const exampleCode = `
console.log(typeof null)
`.trim();




const questions = [
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `console.log(typeof null)`.trim(),
        answers: ["[object]", "[null]", "[undefined]", "Error"],
        answer: "[object]"
    },
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `function func() {
                            return 0;
                      }

                      console.log(typeof func)`,
        answers: ["[object]", "[function]", "[undefined]", "Error"],
        answer: "[function]"
    },
    {
        question: "Что будет выведено в консоль?",
        exampleCode: `console.log(typeof 1/0)
                        `.trim(),
        answers: ["Infinity", "NaN", "[number]", "Error"],
        answer: "NaN"
    }
]

const Test: React.FC = () => {

    const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);

    const backButtonHandler = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1)
        }
    }

    const nextButtonHandler = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        }
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
                <h3 className={styles.questionTitle}>{questions[currentQuestion].question}</h3>
                <Code exampleCode={questions[currentQuestion].exampleCode} />

                <Answers answers={questions[currentQuestion].answers} />
            </div>
            <div className={styles.buttons}>
                <button onClick={backButtonHandler}>Назад</button>
                <button onClick={nextButtonHandler}>Дальше</button>
            </div>
        </div>
    )
}

export default Test;


