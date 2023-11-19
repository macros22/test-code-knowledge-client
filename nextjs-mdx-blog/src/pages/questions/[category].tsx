import { ItemsList, LoadItemsButton } from '@/components/items-list'
import { withLayout } from '@/layouts'
import { questionsApi } from '@/lib/api/questions.api'
import { ITEMS_PER_PAGE } from '@/lib/constants/items-per-page'
import { questionsCategoryName } from '@/lib/constants/names.storage'
import { QUESTIONS_BASE_URL } from '@/lib/constants/urls'
import { getQueryParametr } from '@/lib/helpers/get-param-from-query'
import { getQuestionsUrl } from '@/lib/helpers/get-questions-url'
import { useQuestions, useSessionStorage } from '@/lib/hooks'
import { QuestionsPageProps } from '@/lib/interfaces/questions.interface'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'

import { SWRConfig } from 'swr'

export const getServerSideProps: GetServerSideProps<
  QuestionsPageProps
> = async (context) => {
  const categoryURLName = getQueryParametr(context, 'category') || ''

  const skip = Number(getQueryParametr(context, 'skip')) || 0
  const limit = Number(getQueryParametr(context, 'limit')) || ITEMS_PER_PAGE

  const questionsUrl = getQuestionsUrl({
    categoryURLName,
    skip,
    limit,
  })

  const questions = await questionsApi.getQuestions(questionsUrl)
  const questionsInfo = await questionsApi.getQuestionsInfo(QUESTIONS_BASE_URL)
  let category = ''
  if (questionsInfo) {
    category =
      Object.keys(questionsInfo).find(
        (key) => questionsInfo[key].categoryURLName == categoryURLName,
      ) || ''
  }

  return {
    props: {
      category,
      skip,
      limit,
      fallback: {
        [questionsUrl]: questions,
      },
    },
  }
}

const QuestionsPage: NextPage<QuestionsPageProps> = ({
  category,
  skip,
  limit,
  fallback,
}) => {
  const { questions, isLoadingQuestions } = useQuestions({
    skip,
    limit,
    category,
  })

  const [_, setCategoryInStorage] = useSessionStorage(
    questionsCategoryName,
    category,
  )

  useEffect(() => {
    if (category) {
      setCategoryInStorage(category)
    }
  }, [category])

  if (isLoadingQuestions) {
    return (
      // <Spinner
      //   as="span"
      //   animation="border"
      //   size="sm"
      //   role="status"
      //   aria-hidden="true"
      // />
      <></>
    )
  }

  return (
    <SWRConfig value={{ fallback }}>
      <ItemsList itemsName="questions" items={questions} category={category} />
      <LoadItemsButton skip={skip} limit={limit} category={category} />
    </SWRConfig>
  )
}

export default withLayout('main', QuestionsPage)
