import {
  QUESTIONS_BASE_URL,
  RANDOM_QUESTIONS_BASE_URL,
} from '../constants/urls'

interface IQuestionsProps {
  categoryURLName: string
  skip?: number
  limit?: number
}

export const getQuestionsUrl = ({
  categoryURLName,
  skip,
  limit,
}: IQuestionsProps) => {
  const searchParams =
    (skip == 0 || skip) && limit ? `?skip=${skip}&limit=${limit}` : ''
  return QUESTIONS_BASE_URL + '/' + categoryURLName + searchParams
}

interface IRandomQuestionsProps {
  categoryURLName: string
  limit: number
}

export const getRandomQuestionsUrl = ({
  categoryURLName,
  limit,
}: IRandomQuestionsProps) => {
  const searchParams = `?limit=${limit}`
  return RANDOM_QUESTIONS_BASE_URL + '/' + categoryURLName + searchParams
}
