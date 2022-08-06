import React from 'react';
import styles from './QuestionForm.module.scss';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { Question } from 'interfaces/questions.interface';
import { QuestionFormProps } from './QuestionForm.props';
// import { Button, Checkbox, Input, Textarea, WithLabel } from 'components';
import {
	useAddQuestionMutation,
	useEditQuestionMutation,
} from 'store/questions.api';
import { categoryName } from 'constants/names.storage';
import { useSessionStorage } from 'hooks';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface UserAnswer {
	answer: string;
	isChecked: boolean;
}

const schema = yup.object().shape({
	question: yup.string().required('Write question.'),
	codeExample: yup.string().required('Write code example.'),
	answers: yup.array().of(
		yup.object().shape({
			answer: yup.string().required('Write answer.'),
			isChecked: yup.boolean(),
		})
	),
});

export const QuestionForm = ({
	questionItem,
	mode,
	setIsModalOpen,
}: QuestionFormProps): JSX.Element => {
	const [question, setQuestion] = React.useState<string>(questionItem.question);
	const [questionError, setQuestionError] = React.useState<string>('');
	const [category, _] = useSessionStorage(categoryName, 'javascript');

	const [codeExample, setCodeExample] = React.useState<string>(
		questionItem.codeExample
	);
	const [isCodeExampleChecked, setIsCodeExampleChecked] = React.useState<boolean>(false);
	const [codeExampleError, setCodeExampleError] = React.useState<string>('');

	const initialAnswers = questionItem.answers.map((answer) => ({
		answer: answer.answer,
		isChecked: answer.isCorrect,
	}));
	const [answers, setAnswers] = React.useState<UserAnswer[]>(initialAnswers);
	const [answersErrors, setAnswersErrors] = React.useState<string[]>(
		new Array(questionItem.answers.length).fill('')
	);

	const handleAddAnswerButton = () => {
		const newAnswer: UserAnswer = {
			answer: '',
			isChecked: false,
		}

		setAnswers(answers => {
			// Deep copy.
			const newAnswers: UserAnswer[] = JSON.parse(
				JSON.stringify(answers)
			);
			newAnswers.push(newAnswer);

			return newAnswers;
		})
	}

	const handleDeleteAnswerButton = (index: number) => {
		setAnswers(answers => {
			// Deep copy.
			const newAnswers: UserAnswer[] = JSON.parse(
				JSON.stringify(answers)
			);
			return newAnswers.filter((_, i) => i !== index);
		})
	}

	const resetErrors = () => {
		setQuestionError('');
		setCodeExampleError('');
		setAnswersErrors(new Array(questionItem.answers.length).fill(''));
	};

	const isValidForm = async () => {
		resetErrors();
		let isValid = true;

		try {
			await schema.validate({
				question,
				codeExample,
				answers,
			});
		} catch (error) {
			if (error instanceof ValidationError) {
				isValid = false;
				console.log(error.path);
				if (error.path == 'question') {
					setQuestionError(error.errors[0]);
				} else if (error.path == 'codeExample') {
					setCodeExampleError(error.errors[0]);
				} else if (error.path?.endsWith('.answer')) {
					// ! TO DO: Refactore this block.
					const errorIndex = Number(error.path.match(/\d/g)?.join(''));

					if (errorIndex >= 0) {
						setAnswersErrors((array) => {
							const updatedArray = [...array];
							updatedArray[errorIndex] = (error as ValidationError).errors[0];
							return updatedArray;
						});
					}
				}
			}
		}

		return isValid;
	};

	const [addQuestion, { isError: isErrorAdd }] = useAddQuestionMutation();
	const [editQuestion, { isError: isErrorEdit }] = useEditQuestionMutation();

	const handleSubmitForm = async (event: React.FormEvent) => {
		event.preventDefault();

		const questionPayload = {
			question,
			category,
			codeExample,
			answers: answers.map((answer) => ({
				answer: answer.answer,
				isCorrect: answer.isChecked,
			})),
		} as Omit<Question, 'id'>;

		if (await isValidForm()) {
			switch (mode) {
				case 'add':
					try {
						await addQuestion(questionPayload);

						setIsModalOpen(false);
					} catch (error) {
						console.log(error);
					}

					break;

				case 'edit':
					try {
						await editQuestion({ id: questionItem.id, body: questionPayload });

						setIsModalOpen(false);
					} catch (error) {
						console.log(error);
					}
					break;
			}
		}
	};

	const handleResetButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		// setName(item.name);
		// setDescription(item.description);
		// setCount(item.count);
		// setDestinationCount(item.destinationCount);
	};

	return (
		<>
			{/* <form className={styles.editMedicalItem} onSubmit={handleSubmitForm}>
				<div className={styles.question}>
					<WithLabel labelText="Question">
						<Input
							value={question}
							name="Question"
							errorMessage={questionError}
							onChange={(e) => setQuestion(e.target.value)}
						/>
					</WithLabel>
				</div>

				<div className={styles.codeExample}>
					<WithLabel labelText="Code example">
						<Textarea
							className={styles.textareaCodeExample}
							value={codeExample}
							name="Code example"
							errorMessage={codeExampleError}
							onChange={(e) => setCodeExample(e.target.value)}
						/>
					</WithLabel>
				</div>

				<div className={styles.answersList}>
					{answers.map((answer, index) => {
						return (
							<div key={index} className={styles.answer}>
								<Input
									value={answers[index].answer}
									name={`Answer № ${index + 1}`}
									errorMessage={answersErrors[index]}
									onChange={(e) => {
										e.preventDefault();
										setAnswers((answers) => {
											// Deep copy.
											const updatedAnswers = JSON.parse(
												JSON.stringify(answers)
											);
											updatedAnswers[index].answer = e.target.value;
											return updatedAnswers;
										});
									}}
								/>
								<Checkbox
									name=""
									checked={answers[index].isChecked}
									onChange={() =>
										setAnswers((answers) => {
											// Deep copy.
											const updatedAnswers = JSON.parse(
												JSON.stringify(answers)
											);
											updatedAnswers[index].isChecked =
												!updatedAnswers[index].isChecked;
											return updatedAnswers;
										})
									}
								/>
							</div>
						);
					})}
				</div>

				<Button
					className={styles.saveButton}
					appearance="primary"
					type="submit"
				>
					{mode == 'add' ? 'Add question' : 'Save changes'}
				</Button>
				<Button
					className={styles.resetButton}
					appearance="ghost"
					onClick={handleResetButton}
				>
					Reset
				</Button>
				<Button
					className={styles.addAnswerButton}
					appearance="primary"
					onClick={handleResetButton}
				>
					Add answer
				</Button>
			</form> */}
			<Form className={styles.form}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					{/* <Form.Label>Question</Form.Label> */}
					<div className={"hrdivider" + " " + styles.title}>
						<span>Question</span>
					</div>
					<Form.Control placeholder="Enter question" value={question}
						name="Question"
						onChange={(e) => setQuestion(e.target.value)} />
					<Form.Text className="text=error">
						{questionError}
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-2" controlId="formBasicPassword">
					{/* <Form.Label>Code example</Form.Label> */}
					{/* <div className="hrdivider">
						<hr />
						<span>Code example</span>
					</div> */}
					<div className={"hrdivider" + " " + styles.title}>
						<span>Code example</span>
					</div>
					<Form.Control disabled={!isCodeExampleChecked} as="textarea" placeholder="Code" value={codeExample} onChange={(e) => setCodeExample(e.target.value)} className="mb-2" />
					<Form.Check type="checkbox" label="Show code example?" checked={isCodeExampleChecked} onClick={() => setIsCodeExampleChecked(checked => !checked)} />
				</Form.Group>
				{/* <div className="hrdivider">
					<hr />
					<span>Answers</span>
				</div> */}
				<div className={"hrdivider" + " " + styles.title}>
					<span>Answers</span>
				</div>
				{answers.map((answer, index) => {
					return (
						<InputGroup key={index} className="mb-3">
							<InputGroup.Text>{index + 1}</InputGroup.Text>
							<InputGroup.Checkbox aria-label="Checkbox for following text input" checked={answers[index].isChecked} onChange={() =>
								setAnswers((answers) => {
									// Deep copy.
									const updatedAnswers = JSON.parse(
										JSON.stringify(answers)
									);
									updatedAnswers[index].isChecked =
										!updatedAnswers[index].isChecked;
									return updatedAnswers;
								})
							} />
							<Form.Control aria-label="Text input with checkbox" value={answers[index].answer} onChange={(e) => {
								e.preventDefault();
								setAnswers((answers) => {
									// Deep copy.
									const updatedAnswers = JSON.parse(
										JSON.stringify(answers)
									);
									updatedAnswers[index].answer = e.target.value;
									return updatedAnswers;
								});
							}} />
							<Button variant="danger" onClick={handleDeleteAnswerButton.bind(null, index)}>
								Delete
							</Button>
						</InputGroup>

					);
				})}

				<Button variant="primary" type="submit">
					Submit
				</Button>
				<Button variant="info" className="m-3" onClick={handleAddAnswerButton}>
					Add answer
				</Button>
				<Button variant="danger" >
					Reset
				</Button>
				<Button variant="info" className="m-3" >
					Close
				</Button>
			</Form>
		</>
	);
};
