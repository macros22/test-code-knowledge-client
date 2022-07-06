import React from 'react';
import { useRouter } from 'next/dist/client/router';
import cn from 'clsx';

import styles from './TestResult.module.scss';
import { Answer, Question } from 'interfaces/questions.interface';

import Tag from 'components/atoms/Tag/Tag';
import { Button, Card, Checkbox, Code, Divider } from 'components';
import { useLocalStorage, useSessionStorage } from 'hooks';
import {
	checkedAnswersName,
	currentQuestionIndexName,
} from 'constants/names.storage';

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

	React.useEffect(() => {
		return () => {
			// dispatch(resetState());
		};
	}, []);

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
	questionsAmount: number;
	questions: Question[];
}

export const TestResult = ({
	questionsAmount,
	questions,
}: TestResultProps): JSX.Element => {
	// Before checking all user answers are true.
	// const userAnswersStatus = new Array(questionsAmount).fill(true);

	const [userAnswersStatus, setUserAnswersStatus] = React.useState<boolean[]>(
		new Array(questionsAmount).fill(true)
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
		for (let i = 0; i < questionsAmount; ++i) {
			const questionAnswersStatus = questions[i].answersList.map(
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

	const newTestButtonHandler = () => {
		router.push('/test');
	};

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h3>
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
										Question № {index + 1}
									</h3>
									<Divider />
									<h4 className={styles.questionTitle}>
										{questions[index].question}
									</h4>
									<Code codeExample={questions[index].codeExample} />

									<AnswersListResult
										answers={questions[index].answersList}
										currentQuestion={index}
										checkedAnswers={checkedAnswers}
									/>
								</Card>
							);
						})}
					<Button appearance="primary" onClick={newTestButtonHandler}>
						New test
					</Button>
				</div>
			</div>
		</>
	);
};
