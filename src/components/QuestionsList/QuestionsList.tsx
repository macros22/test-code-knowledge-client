import styles from './QuestionsList.module.scss';
import React from 'react';
import { Category, Question } from 'interfaces/questions.interface';
import { QuestionsListProps } from './QuestionsList.props';
import { Card, QuestionCard, QuestionForm } from 'components';

import { BsPlusLg } from 'react-icons/bs';
import { Modal } from 'react-bootstrap';

const exampleQuestion: Question = {
	id: '9sdasdasdadasd999',
	category: Category.JAVASCRIPT,
	question: 'What will be output to the console?',
	codeExample: `const example = () => {
    return ExampleCode;
}`,
	answers: [
		{ answer: 'first', isCorrect: true },
		{ answer: 'second', isCorrect: false },
		{ answer: 'third', isCorrect: false },
		{ answer: 'fourth', isCorrect: false },
	],
};

export const QuestionsList = ({
	withEdit = false,
	questions,
}: QuestionsListProps): JSX.Element => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

	const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);
	const [isEditQuestionMode, setIsEditQuestionMode] = React.useState(false);

	const handleAddQuestionButton = () => {
		setIsAddQuestionMode(true);
	};

	const makeHandleEditButton = (index: number) => {
		return () => {
			setCurrentQuestionIndex(index);
			setIsEditQuestionMode(true);
		};
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				{/* TODO! Need in refactoring  */}
				<h2>{questions[currentQuestionIndex].category}</h2>

				{withEdit && (
					<BsPlusLg
						className={styles.addQuestionButton}
						onClick={handleAddQuestionButton}
					/>
				)}
			</div>
			<div className={styles.container}>
				{questions && questions.length && (
					<>
						{/* Left Column */}
						<div className={styles.column}>
							{questions.map((question, index) => {
								if (index % 2 === 0) {
									return (
										<Card className={styles.questionCard} key={question.id}>
											<QuestionCard
												withEdit={withEdit}
												handleEditButton={makeHandleEditButton(index)}
												question={question}
												key={question.id}
											/>
										</Card>
									);
								}
							})}
						</div>

						{/* Right Column */}
						<div className={styles.column}>
							{questions.map((question, index) => {
								if (index % 2 !== 0) {
									return (
										<Card className={styles.questionCard} key={question.id}>
											<QuestionCard
												withEdit={withEdit}
												handleEditButton={makeHandleEditButton(index)}
												question={question}
												key={question.id}
											/>
										</Card>
									);
								}
							})}
						</div>
					</>
				)}

				{!questions ||
					(!questions.length && (
						<Card className={styles.questionCard}>Empty medication list</Card>
					))}
			</div>
			{withEdit && isAddQuestionMode && (
				// <Modal setIsModalOpen={setIsAddQuestionMode}>
				<Modal size='lg' show={isAddQuestionMode} onHide={() => setIsAddQuestionMode(false)}>
					<Modal.Body>
						<QuestionForm
							questionItem={exampleQuestion}
							mode="add"
							setIsModalOpen={setIsAddQuestionMode}
						/>
					</Modal.Body>
				</Modal>
			)}

			{withEdit && questions && isEditQuestionMode && (
				// <Modal setIsModalOpen={setIsEditQuestionMode}>
				<Modal size='lg' show={isEditQuestionMode} onHide={() => setIsEditQuestionMode(false)}>
					<Modal.Body>
						<QuestionForm
							questionItem={questions[currentQuestionIndex]}
							mode="edit"
							setIsModalOpen={setIsEditQuestionMode}
						/>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
};
