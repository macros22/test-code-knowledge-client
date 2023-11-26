import * as yup from 'yup'

const REQUIRED_MESSAGE = 'Field is required'

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email().required(REQUIRED_MESSAGE),
  password: yup.string().required(REQUIRED_MESSAGE),
})

export type SignInValidationSchema = yup.InferType<
  typeof signInValidationSchema
>
