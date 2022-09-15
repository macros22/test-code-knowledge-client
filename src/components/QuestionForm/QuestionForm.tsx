import React from 'react';
import styles from './QuestionForm.module.scss';
import { QuestionFormProps } from './QuestionForm.props';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsPlusLg, BsTrash2Fill, BsFillTerminalFill, BsChevronUp } from 'react-icons/bs';
import { useQuestionsInfo } from 'hooks';
import { useQuestionForm } from './useQuestionForm.hook';
import { HrWithContent } from 'components';

export const QuestionForm = ({
	questionItem,
	mode,
	setIsModalOpen,
}: QuestionFormProps): JSX.Element => {

	const {
		question,
		setQuestion,
		questionError,
		setQuestionError,
		category,
		setCategory,
		codeExample,
		setCodeExample,
		isCodeExampleChecked,
		setIsCodeExampleChecked,
		codeExampleError,
		setCodeExampleError,
		answers,
		setAnswers,
		answersErrors,
		setAnswersErrors,
		handleSelectCategory,
		handleAddAnswerButton,
		handleDeleteAnswerButton,
		resetErrors,
		handleSubmitForm,
		handleResetButton,
	} = useQuestionForm({
		questionItem,
		mode,
	});

	const { questionsInfo } = useQuestionsInfo();

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
				<HrWithContent className={styles.title}>
					Category
				</HrWithContent>

				<Form.Select className="mb-3" aria-label="Default select example" value={category} onChange={handleSelectCategory}>
					{Object.keys(questionsInfo).map(category => {
						return (
							<option value={category} key={category}>{category}</option>
						);
					})}

				</Form.Select>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					{/* <Form.Label>Question</Form.Label> */}
					<HrWithContent className={styles.title}>
						Question
					</HrWithContent>
					<Form.Control placeholder="Enter question" value={question}
						name="Question"
						onChange={(e) => setQuestion(e.target.value)} />
					<Form.Text className="text-error">
						{questionError}
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-2" controlId="formBasicPassword">
					<HrWithContent className={styles.title}>
						<BsFillTerminalFill /> Code example
					</HrWithContent>
					<Form.Control disabled={!isCodeExampleChecked} as="textarea" placeholder="Code" value={codeExample} onChange={(e) => setCodeExample(e.target.value)} className={styles.textareaCodeExample} />
					<Form.Check type="checkbox" label="Show code example?" checked={isCodeExampleChecked} onClick={() => setIsCodeExampleChecked(checked => !checked)} />
				</Form.Group>

				<HrWithContent className={styles.title}>
					Answers
				</HrWithContent>
				{answers.map((answer, index) => {
					return (
						<InputGroup key={index} className="mb-3">
							<InputGroup.Text>{index + 1}</InputGroup.Text>

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
							<Button variant="danger" onClick={handleDeleteAnswerButton.bind(null, index)}>
								<BsTrash2Fill />{` Delete`}
							</Button>
						</InputGroup>

					);
				})}

				<Button variant="primary" type="submit" onClick={handleSubmitForm}>
					Save
				</Button>
				<Button variant="info" className="m-3" onClick={handleAddAnswerButton}>
					<BsPlusLg />
					{`  Add answer`}
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
