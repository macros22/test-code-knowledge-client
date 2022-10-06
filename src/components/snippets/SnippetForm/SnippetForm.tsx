import React from 'react';
import styles from './SnippetForm.module.scss';
import { ISnippetFormProps } from './SnippetForm.props';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsPlusLg, BsTrash2Fill, BsFillTerminalFill, BsChevronUp } from 'react-icons/bs';
import { useSnippetForm } from './useSnippetForm.hook';
import { HrWithContent } from 'components';
import { useSnippetsInfo } from 'hooks/snippets/useSnippetssInfo';

export const SnippetForm = ({
	snippetItem,
	mode,
	setIsModalOpen,
}: ISnippetFormProps): JSX.Element => {
	const {
		snippet,
		setSnippet,
		snippetError,
		setSnippetError,
		category,
		setCategory,
		description,
		setDescription,
		// isDescriptionChecked,
		// setIsDescriptionChecked,
		descriptionError,
		setDescriptionError,
		// answers,
		// setAnswers,
		// answersErrors,
		// setAnswersErrors,
		handleSelectCategory,
		// handleAddAnswerButton,
		// handleDeleteAnswerButton,
		resetErrors,
		handleSubmitForm,
		handleResetButton,
	} = useSnippetForm({
		snippetItem,
		mode,
	});

	const { snippetsInfo } = useSnippetsInfo();

	return (
		<Form className={styles.form}>
			<HrWithContent className={styles.title}>
				Category
			</HrWithContent>

			<Form.Select className="mb-3" aria-label="Default select example" value={category} onChange={handleSelectCategory}>
				{Object.keys(snippetsInfo).map(category => {
					return (
						<option value={category} key={category}>{category}</option>
					);
				})}

			</Form.Select>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				{/* <Form.Label>Snippet</Form.Label> */}
				<HrWithContent className={styles.title}>
					Description
				</HrWithContent>
				<Form.Control placeholder="Enter Snippet" value={description}
					name="description"
					onChange={(e) => setDescription(e.target.value)} />
				<Form.Text className="text-error">
					{descriptionError}
				</Form.Text>
			</Form.Group>
			<Form.Group className="mb-2" controlId="formBasicPassword">
				<HrWithContent className={styles.title}>
					<BsFillTerminalFill /> Snippet
				</HrWithContent>
				<Form.Control as="textarea" placeholder="Snippet" value={snippet} onChange={(e) => setSnippet(e.target.value)} className={styles.textareaSnippet} />
			</Form.Group>


			<Button variant="primary" type="submit" onClick={handleSubmitForm}>
				Save
			</Button>
			<Button variant="danger" >
				Reset
			</Button>
			<Button variant="info" className="m-3" >
				Close
			</Button>
		</Form>
	);
};
