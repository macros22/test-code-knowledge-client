import React, { FC } from 'react'
import { QuestionFormProps } from './question-form.props'
// import { Col, FormProvider, InputGroup, Row } from 'react-bootstrap'
import {
  BsPlusLg,
  BsTrash2Fill,
  BsFillTerminalFill,
  BsChevronUp,
} from 'react-icons/bs'
import { useQuestionForm } from './useQuestionForm.hook'
import { useQuestionsInfo } from '@/lib/hooks'
import { deepCopy } from '@/lib/helpers/deep-copy'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { QuestionFormSchema, questionFormSchema } from './question.schema'
import { useQuestionsMutation } from '@/lib/hooks/items/questions/use-questions-mutation'
import { IQuestionDto } from '@/lib/interfaces/questions.interface'
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// export const QuestionForm2: FC<QuestionFormProps> = ({
//   questionItem,
//   mode,
//   setIsModalOpen,
// }) => {
//   const {
//     question,
//     setQuestion,
//     questionError,
//     setQuestionError,
//     category,
//     setCategory,
//     codeExample,
//     setCodeExample,
//     isCodeExampleChecked,
//     setIsCodeExampleChecked,
//     codeExampleError,
//     setCodeExampleError,
//     answers,
//     setAnswers,
//     answersErrors,
//     setAnswersErrors,
//     handleSelectCategory,
//     handleAddAnswerButton,
//     handleDeleteAnswerButton,
//     resetErrors,
//     handleSubmitForm,
//     handleResetButton,
//     tags,
//     setTags,
//     handleAddTagButton,
//     handleDeleteTagButton,
//     infoLinks,
//   } = useQuestionForm({
//     questionItem,
//     mode,
//   })

//   const handleCloseModalButton = () => {
//     setIsModalOpen(false)
//   }

//   const { questionsInfo } = useQuestionsInfo()

//   return (
//     <Form>

//       <Form.Group className="mb-2" controlId="formBasicPassword">
//         {/* <HrWithContent className={styles.title}>
//           <BsFillTerminalFill /> Code example
//         </HrWithContent> */}
//         <Form.Control
//           disabled={!isCodeExampleChecked}
//           as="textarea"
//           placeholder="Code"
//           value={codeExample}
//           onChange={(e) => setCodeExample(e.target.value)}
//           // className={styles.textareaCodeExample}
//         />
//         <Form.Check
//           type="checkbox"
//           label="Show code example?"
//           checked={isCodeExampleChecked}
//           onClick={() => setIsCodeExampleChecked((checked) => !checked)}
//         />
//       </Form.Group>

//       {/* <HrWithContent className={styles.title}>Answers</HrWithContent> */}
//       {answers.map((_, index) => {
//         return (
//           <InputGroup key={index} className="mb-3">
//             <InputGroup.Text>{index + 1}</InputGroup.Text>

//             <Form.Control
//               aria-label="Text input with checkbox"
//               value={answers[index].answer}
//               onChange={(e) => {
//                 e.preventDefault()
//                 setAnswers((answers) => {
//                   const updatedAnswers = deepCopy(answers)
//                   updatedAnswers[index].answer = e.target.value
//                   return updatedAnswers
//                 })
//               }}
//             />
//             <InputGroup.Checkbox
//               aria-label="Checkbox for following text input"
//               checked={answers[index].isChecked}
//               onChange={() =>
//                 setAnswers((answers) => {
//                   const updatedAnswers = deepCopy(answers)
//                   updatedAnswers[index].isChecked =
//                     !updatedAnswers[index].isChecked
//                   return updatedAnswers
//                 })
//               }
//             />
//             <Button
//               // variant="danger"
//               onClick={handleDeleteAnswerButton.bind(null, index)}
//             >
//               <BsTrash2Fill />
//               {` Delete`}
//             </Button>
//           </InputGroup>
//         )
//       })}

//       {/* <HrWithContent className={styles.title}>
// 				Tags
// 			</HrWithContent>
// 			{tags.map((tag, index) => {
// 				return (
// 					<InputGroup key={index} className="mb-3">
// 						<InputGroup.Text>{index + 1}</InputGroup.Text>

// 						 <Form.Control aria-label="Text input with checkbox" value={tags[index]} onChange={(e) => {
// 							e.preventDefault();
// 							setTags((tags) => {
// 								const updatedTags = [...tags];
// 								updatedTags[index] = e.target.value;
// 								return updatedTags;
// 							});
// 						}} />

// 						<Button variant="danger" onClick={handleDeleteTagButton.bind(null, index)}>
// 							<BsTrash2Fill />{` Delete`}
// 						</Button>
// 					</InputGroup>

// 				);
// 			})} */}

//       <Row xs="auto">
//         <Col>
//           <Button variant="primary" type="submit" onClick={handleSubmitForm}>
//             Save
//           </Button>
//         </Col>
//         <Col>
//           <Button variant="primary" onClick={handleAddAnswerButton}>
//             <BsPlusLg />
//             {`  Add answer`}
//           </Button>
//         </Col>
//         <Col>
//           <Button variant="primary" onClick={handleAddTagButton}>
//             <BsPlusLg />
//             {`  Add tag`}
//           </Button>
//         </Col>
//         <Col>
//           <Button variant="danger" onClick={handleResetButton}>
//             Reset
//           </Button>
//         </Col>
//         <Col>
//           <Button variant="info" onClick={handleCloseModalButton}>
//             Close
//           </Button>
//         </Col>
//       </Row>
//     </Form>
//   )
// }

export const QuestionForm: FC<QuestionFormProps> = ({ questionItem, mode }) => {
  const { questionsInfo } = useQuestionsInfo()

  const form = useForm({
    resolver: yupResolver(questionFormSchema),
    // defaultValues: questionItem,
  })

  const {
    patchQuestion,
    isPatchQuestionLoading,
    postQuestion,
    isPostQuestionLoading,
  } = useQuestionsMutation({
    id: questionItem.id,
    categoryURLName: questionsInfo[questionItem.category]?.categoryURLName,
  })

  const onSubmit = (data: QuestionFormSchema) => {
    const questionPayload: IQuestionDto = {
      ...data,
      tags: [],
      infoLinks: [],
    }

    const mutateSnippet = async () => {
      switch (mode) {
        case 'add':
          // postSnippet(snippetPayload)
          break
        case 'edit':
          // patchSnippet(snippetPayload)
          break
      }
    }
    mutateSnippet()
  }

  const handleResetButton = (e) => {
    form.reset(questionItem)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(questionsInfo).map((category) => {
                      return (
                        <SelectItem value={category} key={category}>
                          {category}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder={field.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codeExample"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Snippet</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-40"
                  placeholder={field.name}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8 flex flex-wrap gap-2">
          <Button
            type="submit"
            loading={isPatchQuestionLoading || isPostQuestionLoading}
          >
            Save
          </Button>
          <Button
            className="ml-auto"
            variant="outline"
            onClick={handleResetButton}
          >
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
