import { useQuestionsInfo, useSnippetsInfo } from '@/lib/hooks'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import Link from 'next/link'
import { AmountButton } from '../ui/amount-button'
import { Spinner } from '../ui/spinner'

export const CategoryCards = () => {
  const router = useRouter()

  const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo()
  const { snippetsInfo, isLoadingSnippetsInfo } = useSnippetsInfo()

  const passTestButtonHandler = (category: string) => () => {
    const categoryQuestionsAmount = questionsInfo[category].amount
    const defaultQuestionsForTestSize = 5

    const sizeInQuery =
      categoryQuestionsAmount < defaultQuestionsForTestSize
        ? categoryQuestionsAmount
        : defaultQuestionsForTestSize
    router.replace(
      `/test/${questionsInfo[category].categoryURLName}?questionsAmount=${sizeInQuery}`,
    )
  }

  if (isLoadingQuestionsInfo || isLoadingSnippetsInfo) {
    return (
      <div className="mx-auto flex flex-wrap justify-center gap-5">
        <Spinner className="mt-10" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex flex-wrap justify-center gap-5">
      {Object.keys(questionsInfo).map((category) => {
        return (
          <Card className="w-[280px]" key={category}>
            <CardHeader>
              <CardTitle className="flex justify-center text-3xl tracking-wide before:mr-3 before:text-primary before:content-['{'] after:ml-3 after:text-primary after:content-['}']">
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center gap-5 pb-5 align-middle">
              <AmountButton
                amount={questionsInfo[category].amount}
                className="w-full text-lg"
              >
                <Link
                  href={`/questions/${questionsInfo[category].categoryURLName}`}
                >
                  Questions:
                </Link>
              </AmountButton>
              {snippetsInfo[category] && (
                <AmountButton
                  amount={snippetsInfo[category].amount}
                  className="w-full text-lg"
                >
                  <Link
                    href={`/snippets/${snippetsInfo[category].categoryURLName}`}
                  >
                    Snippets:
                  </Link>
                </AmountButton>
              )}
              <Button
                className="w-full text-lg"
                onClick={passTestButtonHandler(category)}
              >
                Go to test
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
