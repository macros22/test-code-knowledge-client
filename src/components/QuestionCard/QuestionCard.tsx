import React from 'react';
import cn from 'clsx';
import styles from './QuestionCard.module.scss';
import { QuestionCardProps } from './QuestionCard.props';
import { Code } from 'components';
import { useDeleteQuestionMutation } from 'store/questions.api';

import { BsPencilFill, BsFillTrashFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';

import { Answer } from 'interfaces/questions.interface';


export const QuestionCard = ({
	question,
	handleEditButton,
	withEdit = false,
}: QuestionCardProps): JSX.Element => {
	const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);

	const toggleAnswerVisibility = () => {
		setIsAnswerVisible((isVisible) => !isVisible);
	};

	const [deleteQuestion, { isError }] = useDeleteQuestionMutation();
	const handleDeleteButton = async () => {
		await deleteQuestion(question.id);
	};

	const [correctAnswers, setCorrectAnswers] = React.useState<Answer[]>([]);

	React.useEffect(() => {
		setCorrectAnswers(
			question.answers.filter((answer) => answer.isCorrect)
		);
	}, []);

	return (<>
		<div className={styles.wrapper}>
			<div className={styles.questionCard}>
				<div className={styles.question}>
					<h4>{question.question}</h4>
					<hr />
				</div>

				{question.codeExample &&
					<div className={styles.codeExample}>
						<Code codeExample={question.codeExample} />
						<hr />
					</div>
				}

				<div className={styles.buttons}>
					{isAnswerVisible
						?
						<>
							<BsChevronUp
								className={styles.chevronIcon}
								onClick={toggleAnswerVisibility}
							/>
							<h5 className={styles.answerStatusText}>
								{' '}
								Hide answer
							</h5>
						</>
						:
						<>
							<BsChevronDown
								className={styles.chevronIcon}
								onClick={toggleAnswerVisibility}
							/>
							<h5 className={styles.answerStatusText}>
								{' '}
								Show answer{' '}
							</h5>
						</>
					}

					{withEdit && (
						<div className={styles.editButtons}>
							<BsPencilFill
								className={styles.iconButton}
								onClick={handleEditButton}
							/>
							<BsFillTrashFill
								className={styles.iconButton}
								onClick={handleDeleteButton}
							/>
						</div>
					)}
				</div>

				<div
					className={cn({
						[styles.answer]: isAnswerVisible,
						[styles.answerInVisible]: !isAnswerVisible,
					})}
				>
					<hr />
					{correctAnswers.length &&
						correctAnswers.map((answer) => {
							return <h5 key={answer.answer}>{answer.answer}</h5>;
						})}
				</div>
			</div>
		</div>
	</>
	);
};
