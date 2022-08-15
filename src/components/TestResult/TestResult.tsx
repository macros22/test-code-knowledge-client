import React from 'react';
import { useRouter } from 'next/dist/client/router';
import cn from 'clsx';

import styles from './TestResult.module.scss';
import { Answer, Question } from 'interfaces/questions.interface';
import { Card, Checkbox, Code, Tag } from 'components';
import { useLocalStorage, useSessionStorage } from 'hooks';
import {
	categoryName,
	checkedAnswersName,
	currentQuestionIndexName,
} from 'constants/names.storage';
import { Button } from 'react-bootstrap';

interface IProps {
	answers: Answer[];
	currentQuestion: number;
	checkedAnswers: boolean[][];
}

const AnswersListResult: React.FC<IProps> = ({
	answers,
	currentQuestion,
	checkedAnswers,
}) => {
	const answersList = answers;

	// const dispatch = useAppDispatch();

	const getAnswerLabel = (index: number, isMarked: boolean) => {
		// 'correct' - answer marked and it`s correct.
		// 'error' - answer marked and it`s incorrect.
		// 'empty' - answer unmarked and it`s correct.
		// 'missing' - answer unmarked and it`s incorrect.
		let result: 'correct' | 'error' | 'empty' | 'missing' = 'error';

		if (isMarked) {
			answersList[index].isCorrect ? (result = 'correct') : (result = 'error');
		} else {
			!answersList[index].isCorrect ? (result = 'empty') : (result = 'missing');
		}

		switch (result) {
			case 'error':
				return (
					<Tag className={styles.tag} color="error">
						Error
					</Tag>
				);
			case 'correct':
				return (
					<Tag className={styles.tag} color="success">
						Correct
					</Tag>
				);
			case 'missing':
				return (
					<Tag className={styles.tag} color="info">
						Missing correct
					</Tag>
				);
		}
	};

	return (
		<>
			<div className={styles.answersList}>
				{answers.map((answer, index) => {
					return (
						<li className={styles.answer} key={answer.answer}>
							<Checkbox
								name={answer.answer}
								value={answer.answer}
								checked={checkedAnswers[currentQuestion][index]}
								disabled
							/>
							<div className={styles.tag}>
								{getAnswerLabel(index, checkedAnswers[currentQuestion][index])}
							</div>
						</li>
					);
				})}
			</div>
		</>
	);
};

interface TestResultProps {

	questions: Question[];
}

export const TestResult = ({
	questions,
}: TestResultProps): JSX.Element => {

	// Before checking all user answers are true.
	const [userAnswersStatus, setUserAnswersStatus] = React.useState<boolean[]>(
		new Array(questions.length).fill(true)
	);
	const changeUserAnswerStatus = (questionIndex: number) => {
		setUserAnswersStatus((userAnswersStatus) => {
			const newUserAnswersStatus = [...userAnswersStatus];
			newUserAnswersStatus[questionIndex] =
				!newUserAnswersStatus[questionIndex];
			return newUserAnswersStatus;
		});
	};

	const [checkedAnswers, setCheckedAnswers] = useSessionStorage<boolean[][]>(
		checkedAnswersName,
		[]
	);

	React.useEffect(() => {
		for (let i = 0; i < questions.length; ++i) {
			const questionAnswersStatus = questions[i].answers.map(
				(answer) => answer.isCorrect
			);
			if (
				JSON.stringify(questionAnswersStatus) !==
				JSON.stringify(checkedAnswers[i])
			) {
				changeUserAnswerStatus(i);
			}
		}

		return () => setCheckedAnswers([]);
	}, []);

	React.useEffect(() => {
		window.onpopstate = () => {
			router.push('/');
		};
	}, []);

	const router = useRouter();
	const [category] = useSessionStorage(categoryName, '');

	const newTestButtonHandler = () => {
		if (category) {
			router.push(`/test/${category}?questionsAmount=${questions.length}`);
		}
	};

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h3 className={styles.title}>
						Correct answers:{' '}
						{
							userAnswersStatus.filter((answerStatus) => answerStatus === true)
								.length
						}{' '}
						from {userAnswersStatus.length}
					</h3>
					{checkedAnswers.length &&
						questions.map((question, index) => {
							return (
								<Card
									className={cn(styles.card, {
										[styles.successCard]: userAnswersStatus[index],
										[styles.errorCard]: !userAnswersStatus[index],
									})}
									key={index + question.question}
								>
									<h3 className={styles.questionTitle}>
										Question {index + 1}
									</h3>
									<hr />
									<h4 className={styles.questionTitle}>
										{questions[index].question}
									</h4>
									{questions[index].codeExample &&
										<Code codeExample={questions[index].codeExample} />
									}

									<AnswersListResult
										answers={questions[index].answers}
										currentQuestion={index}
										checkedAnswers={checkedAnswers}
									/>
								</Card>
							);
						})}
					<Button onClick={newTestButtonHandler}>
						New test
					</Button>
				</div>
			</div>
		</>
	);
};
