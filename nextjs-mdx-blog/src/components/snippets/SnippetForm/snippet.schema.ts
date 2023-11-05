import * as yup from 'yup'

export const snippetSchema = yup.object().shape({
  question: yup.string().required('Write description.'),
  snippet: yup.string().required('Write snippet.'),
  category: yup.string(),
  tags: yup.array().of(yup.string()),
  infoLinks: yup.array().of(
    yup.object().shape({
      link: yup.string(),
      description: yup.string(),
    }),
  ),
})
