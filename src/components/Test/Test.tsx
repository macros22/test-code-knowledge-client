import React from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from './Test.module.scss';
import { Answer, Question } from 'interfaces/questions.interface';
import { Code } from 'components';
import { useSessionStorage } from 'hooks';
import {
	checkedAnswersName,
	currentQuestionIndexName,
} from 'constants/names.storage';
import { Button, Form } from 'react-bootstrap';

export const answers = ['[object]', '[null]', '[undefined]', 'Error'];

interface AnswersListProps {
	answers: Answer[];
	setCheckedAnswers: React.Dispatch<React.SetStateAction<boolean[][]>>;
	currentQuestion: number;
	checkedAnswers: boolean[][];
}

const AnswersList = ({
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

interface TestProps {
	questions: Question[];
}

export const Test = ({ questions }: TestProps): JSX.Element => {
	const router = useRouter();

	const [currentQuestion, setCurrentQuestion] = useSessionStorage<number>(
		currentQuestionIndexName,
		0
	);
	const [checkedAnswers, setCheckedAnswers] = useSessionStorage<boolean[][]>(
		checkedAnswersName,
		[]
	);

	const initialQuestionsStatus = new Array(questions.length).fill(false);
	initialQuestionsStatus[currentQuestion] = true;
	const [questionsStatus, setQuestionsStatus] = React.useState<boolean[]>(
		initialQuestionsStatus
	);

	React.useEffect(() => {
		// Fill checked answers array.

		const checkedAnswersInitial = new Array(questions.length);
		for (let i = 0; i < questions.length; ++i) {
			const answersAmount = questions[i].answers.length;
			checkedAnswersInitial[i] = new Array(answersAmount).fill(false);
		}

		setCheckedAnswers(checkedAnswersInitial);
	}, []);

	React.useEffect(() => {
		window.onpopstate = () => {
			router.push('/');
		};

		return () => {
			setCurrentQuestion(0);
		};
	}, []);

	// Handlers.
	const nextButtonHandler = () => {
		if (
			currentQuestion < questions.length - 1 &&
			checkedAnswers[currentQuestion].indexOf(true) !== -1
		) {
			const tmp = [...questionsStatus];
			tmp[currentQuestion + 1] = true;
			setQuestionsStatus(tmp);

			setCurrentQuestion((currentQuestion) => currentQuestion + 1);
		}
	};

	const endTestHandler = () => {
		if (checkedAnswers[currentQuestion].indexOf(true) !== -1) {
			// router.push(`/testResult/${category}`);
			router.push(`/testResult`);
		}
	};

	return (
		<>
			{questions.length && (
				<div className={styles.wrapper}>
					<div className={styles.questionNumbers}>
						{questions.map((question, index) => {
							let spanStyle = '';
							if (currentQuestion == index) {
								spanStyle = styles.currentItem;
							} else if (currentQuestion < index) {
								spanStyle = styles.nextItem;
							}

							return (
								<span className={spanStyle} key={question.id}>
									{index + 1}
								</span>
							);
						})}
					</div>
					<div className={styles.content}>
						<h4 className={styles.questionTitle}>
							{questions[currentQuestion].question}
						</h4>
						<hr />
						{
							questions[currentQuestion].codeExample &&
							<Code codeExample={questions[currentQuestion].codeExample} />
						}

						{checkedAnswers.length && (
							<AnswersList
								checkedAnswers={checkedAnswers}
								currentQuestion={currentQuestion}
								setCheckedAnswers={setCheckedAnswers}
								answers={questions[currentQuestion].answers}
							/>
						)}
					</div>
					<div className={styles.buttons}>
						{currentQuestion < questions.length - 1 ? (
							<Button onClick={nextButtonHandler}>
								Next
							</Button>
						) : (
							<Button onClick={endTestHandler}>
								Finish test
							</Button>
						)}
					</div>
				</div>
			)}
		</>
	);
};
