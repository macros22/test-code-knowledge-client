import { GetServerSideProps } from 'next'

import { Spinner } from 'react-bootstrap'

import dynamic from 'next/dynamic'
import { Test } from '@/components/test'
import { withLayout } from '@/layouts'
import { questionsApi } from '@/lib/api/questions.api'
import {
  questionsCategoryName,
  questionsInStorageName,
} from '@/lib/constants/names.storage'
import { QUESTIONS_BASE_URL } from '@/lib/constants/urls'
import { getQueryParametr } from '@/lib/helpers/get-param-from-query'
import { getRandomQuestionsUrl } from '@/lib/helpers/get-questions-url'
import {
  useQuestionsApi,
  useSessionStorage,
  useQuestionsInfo,
} from '@/lib/hooks'
import { IQuestion } from '@/lib/interfaces/questions.interface'
import { useState, useEffect } from 'react'

// const Test = dynamic<ITestProps>(() =>
//   import('components/test/Test/Test/Test').then(module => module.Test)
// );

interface ITestPageProps extends Record<string, unknown> {
  category: string
  questionsAmount: number
}

export const getServerSideProps: GetServerSideProps<ITestPageProps> = async (
  context,
) => {
  const questionsAmount =
    Number(getQueryParametr(context, 'questionsAmount')) || 1

  const categoryURLName = getQueryParametr(context, 'category') || ''

  const questionsInfo = await questionsApi.getQuestionsInfo(QUESTIONS_BASE_URL)
  let category = ''
  if (questionsInfo) {
    category =
      Object.keys(questionsInfo).find(
        (key) => questionsInfo[key].categoryURLName == categoryURLName,
      ) || ''
  }

  return { props: { category, questionsAmount } }
}

const TestPage = ({
  category,
  questionsAmount,
}: ITestPageProps): JSX.Element => {
  const { api } = useQuestionsApi()
  const [questions, setQuestions] = useState<IQuestion[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [_, setCategoryInStorage] = useSessionStorage(
    questionsCategoryName,
    category,
  )

  useEffect(() => {
    setCategoryInStorage(category)
  }, [category])

  // Save questions in storage to get them in TestResult page.
  const [__, setQuestionsInStorage] = useSessionStorage(
    questionsInStorageName,
    [],
  )

  const { questionsInfo } = useQuestionsInfo()

  useEffect(() => {
    console.log('a', questionsInfo, category, questionsInfo[category])
    if (questionsInfo && category && questionsInfo[category]) {
      console.log('b')
      const questionsUrl = getRandomQuestionsUrl({
        categoryURLName: questionsInfo[category].categoryURLName,
        limit: questionsAmount > 1 ? questionsAmount : 5,
      })

      // setIsLoading(true);
      api.getQuestions(questionsUrl).then((data) => {
        setQuestions(data)
        if (data) {
          console.log('c', data)
          //@ts-ignore
          setQuestionsInStorage(data)
        }
      })
    }
  }, [questionsInfo, category, questionsInfo[category]])

  if (isLoading || !category) {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    )
  }

  return (
    <>
      {questions && questions.length && category && (
        <>
          <Test questions={questions} />
        </>
      )}
    </>
  )
}

export default withLayout('main', TestPage)
