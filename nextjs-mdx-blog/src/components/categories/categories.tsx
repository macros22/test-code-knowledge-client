import { useQuestionsInfo, useSnippetsInfo } from '@/lib/hooks'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'

import {
  SquareCode,
  ShieldQuestion,
  MoveRight,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { Icons } from '../icons'

export const Categories = () => {
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
      // <Spinner
      //   as="span"
      //   animation="border"
      //   size="sm"
      //   role="status"
      //   aria-hidden="true"
      // />
      <>spinner</>
    )
  }

  return (
    <>
      <div className="mx-auto flex flex-wrap gap-5">
        {Object.keys(questionsInfo).map((category) => {
          return (
            <Card className="w-[280px]">
              <CardHeader>
                <CardTitle className="flex justify-center text-3xl before:mr-3 before:text-primary before:content-['{'] after:ml-3 after:text-primary after:content-['}']">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-5 pb-5 align-middle">
                <Button asChild size="lg" className="w-full" variant="outline">
                  <Link
                    href={`/questions/${questionsInfo[category].categoryURLName}`}
                  >
                    <ShieldQuestion className="mr-1 text-8xl" /> Questions
                    {/* <Icons.arrowRight /> */}
                  </Link>
                </Button>
                {snippetsInfo[category] && (
                  <Button
                    asChild
                    size="lg"
                    className="w-full"
                    variant="outline"
                  >
                    <Link
                      href={`/snippets/${questionsInfo[category].categoryURLName}`}
                    >
                      <SquareCode className="mr-1" /> Snippets
                      {/* <Icons.arrowRight /> */}
                    </Link>
                  </Button>
                )}
                <Button
                  size="lg"
                  className="w-full"
                  onClick={passTestButtonHandler(category)}
                >
                  <ShieldCheck className="mr-1" />
                  Test
                  {/* <Icons.arrowRight /> */}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
