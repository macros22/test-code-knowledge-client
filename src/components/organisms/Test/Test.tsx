import React from 'react';
import { useRouter } from 'next/dist/client/router';
import styles from './Test.module.scss';

import { Answer, Question } from 'interfaces/questions.interface';

import { Button, Checkbox, Code, Divider } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { useSessionStorage } from 'hooks';
import {
	checkedAnswersName,
	currentQuestionIndexName,
} from 'constants/names.storage';

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
						<Checkbox
							name={answer.answer}
							value={answer.answer}
							checked={checkedAnswers[currentQuestion][index]}
							onChange={() => handleOnChange(index)}
						/>
					</li>
				);
			})}
		</div>
	);
};

interface TestProps {
	questionsAmount: number;
	questions: Question[];
}

export const Test = ({
	questionsAmount,
	questions,
}: TestProps): JSX.Element => {
	const router = useRouter();

	const [currentQuestion, setCurrentQuestion] = useSessionStorage<number>(
		currentQuestionIndexName,
		0
	);
	const [checkedAnswers, setCheckedAnswers] = useSessionStorage<boolean[][]>(
		checkedAnswersName,
		[]
	);

	const initialQuestionsStatus = new Array(questionsAmount).fill(false);
	initialQuestionsStatus[currentQuestion] = true;
	const [questionsStatus, setQuestionsStatus] = React.useState<boolean[]>(
		initialQuestionsStatus
	);

	React.useEffect(() => {
		// Fill checked answers array.
		if (!checkedAnswers.length) {
			const checkedAnswersInitial = new Array(questionsAmount);
			for (let i = 0; i < questionsAmount; ++i) {
				const answersAmount = questions[i].answersList.length;
				checkedAnswersInitial[i] = new Array(answersAmount).fill(false);
			}

			setCheckedAnswers(checkedAnswersInitial);
		}

		return () => setCurrentQuestion(0);
	}, []);

	React.useEffect(() => {
		window.onpopstate = () => {
			router.push('/');
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
		router.push('/testResult');
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
						<Divider className={styles.divider} />
						<Code codeExample={questions[currentQuestion].codeExample} />

						{checkedAnswers.length && (
							<AnswersList
								checkedAnswers={checkedAnswers}
								currentQuestion={currentQuestion}
								setCheckedAnswers={setCheckedAnswers}
								answers={questions[currentQuestion].answersList}
							/>
						)}
					</div>
					<div className={styles.buttons}>
						{currentQuestion < questions.length - 1 ? (
							<Button appearance={'primary'} onClick={nextButtonHandler}>
								Next
							</Button>
						) : (
							<Button appearance={'primary'} onClick={endTestHandler}>
								Finish test
							</Button>
						)}
					</div>
				</div>
			)}
		</>
	);
};