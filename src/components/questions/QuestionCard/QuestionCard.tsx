import React from 'react';
import cn from 'clsx';
import styles from './QuestionCard.module.scss';
import { IQuestionCardProps } from './QuestionCard.props';
import { Code } from 'components';
import { BsPencilFill, BsFillTrashFill, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { IAnswer } from 'libs/interfaces/questions.interface';
import { Badge } from 'react-bootstrap';
import { useQuestionsApi } from 'libs/hooks/questions/useQuestionsApi';

export const QuestionCard = ({
	question,
	handleEditButton,
	withEdit = false,
	index,
}: IQuestionCardProps): JSX.Element => {
	const [isAnswerVisible, setIsAnswerVisible] = React.useState(false);

	const toggleAnswerVisibility = () => {
		setIsAnswerVisible((isVisible) => !isVisible);
	};


	const { api } = useQuestionsApi();
	const handleDeleteButton = async () => {
		await api.deleteQuestion(question.id);
	};

	const [correctAnswers, setCorrectAnswers] = React.useState<IAnswer[]>([]);

	React.useEffect(() => {
		setCorrectAnswers(
			question.answers.filter((answer) => answer.isCorrect)
		);
	}, []);

	return (<>
		<div className={styles.wrapper}>
			<div className={styles.questionCard}>
				<div className={styles.questionNumber}>
					<h5 className={styles.questionNumberTitle}>
						{'Question '}
						<Badge className={styles.questionNumberBadge} bg="danger">
							{index}
						</Badge>
					</h5>
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
				<div className={styles.question}>
					<hr />
					<h5>{question.question}</h5>
				</div>

				{question.codeExample &&
					<div className={styles.codeExample}>
						<hr />
						<Code codeExample={question.codeExample} language='typescript' />
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
