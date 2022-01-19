import React from "react";
import styles from './test.module.css';
import Code from '../code';


const question = "Что будет выведено в консоль?"

export const answers = [
    "[object]", "[null]", "[undefined]", "Error"
];

function Answers() {
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

// Historical error!
typeof null === "object" // true
`.trim();

const Test: React.FC = () => {

    return (
        <div className={styles.article}>


            <div className={styles.content}>
                <h3>{question}</h3>
                <Code exampleCode={exampleCode} />

                <Answers />
            </div>
        </div>
    )
}

export default Test;


