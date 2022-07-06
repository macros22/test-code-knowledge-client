import React from 'react';
import styles from './QuestionCard.module.scss';
import { QuestionCardProps } from './QuestionCard.props';
import { Code, Divider } from 'components';
import { useDeleteQuestionMutation } from 'store/questions.api';
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

export const QuestionCard = ({
	question,
	handleEditButton,
	withEdit = false,
}: QuestionCardProps): JSX.Element => {
	const [deleteQuestion, { isError }] = useDeleteQuestionMutation();
	const handleDeleteButton = async () => {
		await deleteQuestion(question.id);
	};

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

				{withEdit && (
					<div className={styles.buttons}>
						<HiPencil className={styles.iconButton} onClick={handleEditButton} />
						<MdDelete className={styles.iconButton} onClick={handleDeleteButton} />
					</div>
				)}
			</div>
		</div>
	);
};
