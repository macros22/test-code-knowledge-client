import { AnswersListProps } from "./AnswersList.props";
import { Form } from 'react-bootstrap';
import styles from './AnswersList.module.scss';

export const AnswersList = ({
    setCheckedAnswers,
    checkedAnswers,
    answers,
    currentQuestion,
}: AnswersListProps): JSX.Element => {
    const handleOnChange = (answerIndex: number) => {
        setCheckedAnswers((checkedAnswers) => {
            const newCheckedAnswers = JSON.parse(JSON.stringify(checkedAnswers));
            newCheckedAnswers[currentQuestion][answerIndex] =
                !newCheckedAnswers[currentQuestion][answerIndex];
            return newCheckedAnswers;
        });
    };

    return (
        <div className={styles.answersList}>
            {answers.map((answer, index) => {
                return (
                    <li key={answer.answer}>
                        <>
                            <Form.Check
                                style={{ fontSize: '28px' }}
                                type={'checkbox'}
                                id={answer.answer}
                                label={answer.answer}
                                value={answer.answer}
                                checked={checkedAnswers[currentQuestion][index]}
                                onChange={() => handleOnChange(index)}
                            />
                        </>
                    </li>
                );
            })}
        </div>
    );
};