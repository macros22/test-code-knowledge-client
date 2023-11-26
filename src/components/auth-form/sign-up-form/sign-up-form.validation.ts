import * as yup from 'yup'

const REQUIRED_MESSAGE = 'Field is required'

export const signUpValidationSchema = yup.object().shape({
  email: yup.string().email().required(REQUIRED_MESSAGE),
  name: yup.string().required(REQUIRED_MESSAGE),
  password: yup.string().required(REQUIRED_MESSAGE),
})

export type SignUpValidationSchema = yup.InferType<
  typeof signUpValidationSchema
>
