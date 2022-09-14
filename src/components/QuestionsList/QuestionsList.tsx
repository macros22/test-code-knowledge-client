import styles from './QuestionsList.module.scss';
import React from 'react';
import { Question } from 'interfaces/questions.interface';
import { QuestionsListProps } from './QuestionsList.props';
import { Card, QuestionCard, QuestionForm } from 'components';

import { BsPlusLg } from 'react-icons/bs';
import { Button, Modal } from 'react-bootstrap';
import { useUser } from 'hooks/useUser';
import { useRouter } from 'next/router';
import { categories } from 'constants/categories';

const exampleQuestion: Question = {
	id: '9sdasdasdadasd999',
	category: 'javascript',
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
	questions,
	category: currentCategory
}: QuestionsListProps): JSX.Element => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

	const [isAddQuestionMode, setIsAddQuestionMode] = React.useState(false);
	const [isEditQuestionMode, setIsEditQuestionMode] = React.useState(false);

	const { isLoggedIn } = useUser();

	const handleAddQuestionButton = () => {
		setIsAddQuestionMode(true);
	};

	const makeHandleEditButton = (index: number) => {
		return () => {
			setCurrentQuestionIndex(index);
			setIsEditQuestionMode(true);
		};
	}

	const router = useRouter();
	const categoryButtonHandler = (category: string) => {
		router.push('/questions/' + category);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<div className={styles.categoryButtons}>
					{/* {Object.values(Category).map(category => {
						return (
							<Button
								variant={category == currentCategory ? 'primary' : 'secondary'}
								className={category == currentCategory ? '' : styles.inActiveButton}
								key={category}
								onClick={() => categoryButtonHandler(category)}
							>
								{category}
							</Button>
						);
					})} */}
					{categories.map(category => {
						return (
							<Button
								variant={category.name == currentCategory.toString() ? 'primary' : 'secondary'}
								className={category.name == currentCategory.toString() ? '' : styles.inActiveButton}
								key={category.name}
								onClick={() => categoryButtonHandler(category.name)}
							>
								{category.name}
							</Button>
						);
					})}
				</div>

				{isLoggedIn && (
					<BsPlusLg
						className={styles.addQuestionButton}
						onClick={handleAddQuestionButton}
					/>
				)}
			</div>
			<div className={styles.container}>
				{questions && questions.length && (
					<>
						<div className={styles.column}>
							{questions.map((question, index) => {
								return (
									<Card
										className={styles.questionCard}
										key={question.id}
									>
										<QuestionCard
											withEdit={isLoggedIn}
											handleEditButton={makeHandleEditButton(index)}
											question={question}
											key={question.id}
											index={index+1}
										/>
									</Card>
								);

							})}
						</div>


					</>
				)}

				{!questions ||
					(!questions.length && (
						<Card className={styles.questionCard}>Empty medication list</Card>
					))}
			</div>
			{isLoggedIn && isAddQuestionMode && (
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

			{isLoggedIn && questions && isEditQuestionMode && (
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
