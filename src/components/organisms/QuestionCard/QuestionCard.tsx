import React from 'react';
import cn from 'clsx';
import styles from './QuestionCard.module.scss';
import { QuestionCardProps } from './QuestionCard.props';
import { Code, Divider } from 'components';
import { useDeleteQuestionMutation } from 'store/questions.api';
import { HiPencil, HiChevronDown } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
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
			question.answersList.filter((answer) => answer.isCorrect)
		);
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.questionCard}>
				<div className={styles.question}>
					<h4>{question.question}</h4>
					<Divider className={styles.divider} />
				</div>

				<div className={styles.codeExample}>
					<Code codeExample={question.codeExample} />
					<Divider className={styles.divider} />
				</div>

				<div className={styles.buttons}>
					<HiChevronDown
						className={styles.arrowIcon}
						onClick={toggleAnswerVisibility}
					/>
					<h5 className={styles.answerStatusText}>
						{' '}
						{isAnswerVisible ? 'Hide answer' : 'Show answer'}{' '}
					</h5>

					{withEdit && (
						<div className={styles.editButtons}>
							<HiPencil
								className={styles.iconButton}
								onClick={handleEditButton}
							/>
							<MdDelete
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
					<Divider className={styles.divider} />
					{correctAnswers.length &&
						correctAnswers.map((answer) => {
							return <h5 key={answer.answer}>{answer.answer}</h5>;
						})}
				</div>
			</div>
		</div>
	);
};
