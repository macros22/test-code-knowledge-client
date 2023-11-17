import React, { FC } from 'react'
import { QuestionFormProps } from './question-form.props'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import {
  BsPlusLg,
  BsTrash2Fill,
  BsFillTerminalFill,
  BsChevronUp,
} from 'react-icons/bs'
import { useQuestionForm } from './useQuestionForm.hook'
import { useQuestionsInfo } from '@/lib/hooks'
import { deepCopy } from '@/lib/helpers/deep-copy'

export const QuestionForm: FC<QuestionFormProps> = ({
  questionItem,
  mode,
  setIsModalOpen,
}) => {
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
    tags,
    setTags,
    handleAddTagButton,
    handleDeleteTagButton,
    infoLinks,
  } = useQuestionForm({
    questionItem,
    mode,
  })

  const handleCloseModalButton = () => {
    setIsModalOpen(false)
  }

  const { questionsInfo } = useQuestionsInfo()

  return (
    <Form>
      {/* //className={styles.form} */}
      {/* <HrWithContent className={styles.title}>Category</HrWithContent> */}

      <Form.Select
        className="mb-3"
        aria-label="Default select example"
        value={category}
        onChange={handleSelectCategory}
      >
        {Object.keys(questionsInfo).map((category) => {
          return (
            <option value={category} key={category}>
              {category}
            </option>
          )
        })}
      </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <HrWithContent className={styles.title}>Question</HrWithContent> */}
        <Form.Control
          placeholder="Enter question"
          value={question}
          name="Question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Form.Text className="text-error">{questionError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicPassword">
        {/* <HrWithContent className={styles.title}>
          <BsFillTerminalFill /> Code example
        </HrWithContent> */}
        <Form.Control
          disabled={!isCodeExampleChecked}
          as="textarea"
          placeholder="Code"
          value={codeExample}
          onChange={(e) => setCodeExample(e.target.value)}
          // className={styles.textareaCodeExample}
        />
        <Form.Check
          type="checkbox"
          label="Show code example?"
          checked={isCodeExampleChecked}
          onClick={() => setIsCodeExampleChecked((checked) => !checked)}
        />
      </Form.Group>

      {/* <HrWithContent className={styles.title}>Answers</HrWithContent> */}
      {answers.map((_, index) => {
        return (
          <InputGroup key={index} className="mb-3">
            <InputGroup.Text>{index + 1}</InputGroup.Text>

            <Form.Control
              aria-label="Text input with checkbox"
              value={answers[index].answer}
              onChange={(e) => {
                e.preventDefault()
                setAnswers((answers) => {
                  const updatedAnswers = deepCopy(answers)
                  updatedAnswers[index].answer = e.target.value
                  return updatedAnswers
                })
              }}
            />
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              checked={answers[index].isChecked}
              onChange={() =>
                setAnswers((answers) => {
                  const updatedAnswers = deepCopy(answers)
                  updatedAnswers[index].isChecked =
                    !updatedAnswers[index].isChecked
                  return updatedAnswers
                })
              }
            />
            <Button
              variant="danger"
              onClick={handleDeleteAnswerButton.bind(null, index)}
            >
              <BsTrash2Fill />
              {` Delete`}
            </Button>
          </InputGroup>
        )
      })}

      {/* <HrWithContent className={styles.title}>
				Tags
			</HrWithContent>
			{tags.map((tag, index) => {
				return (
					<InputGroup key={index} className="mb-3">
						<InputGroup.Text>{index + 1}</InputGroup.Text>

						 <Form.Control aria-label="Text input with checkbox" value={tags[index]} onChange={(e) => {
							e.preventDefault();
							setTags((tags) => {
								const updatedTags = [...tags];
								updatedTags[index] = e.target.value;
								return updatedTags;
							});
						}} />

						<Button variant="danger" onClick={handleDeleteTagButton.bind(null, index)}>
							<BsTrash2Fill />{` Delete`}
						</Button>
					</InputGroup>

				);
			})} */}

      <Row xs="auto">
        <Col>
          <Button variant="primary" type="submit" onClick={handleSubmitForm}>
            Save
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleAddAnswerButton}>
            <BsPlusLg />
            {`  Add answer`}
          </Button>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleAddTagButton}>
            <BsPlusLg />
            {`  Add tag`}
          </Button>
        </Col>
        <Col>
          <Button variant="danger" onClick={handleResetButton}>
            Reset
          </Button>
        </Col>
        <Col>
          <Button variant="info" onClick={handleCloseModalButton}>
            Close
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
