import * as yup from 'yup'

const REQUIRED_MESSAGE = 'Field is required';

export const snippetFormSchema = yup.object().shape({
  // question: yup.string().required('Write description.'),
  snippet: yup.string().required(REQUIRED_MESSAGE),
  description: yup.string().required(REQUIRED_MESSAGE),
  category: yup.string().required(REQUIRED_MESSAGE),
  // tags: yup.array().of(yup.string()),
  // infoLinks: yup.array().of(
  //   yup.object().shape({
  //     link: yup.string(),
  //     description: yup.string(),
  //   }),
  // ),
})

export type SnippetFormSchema = yup.InferType<typeof snippetFormSchema>
