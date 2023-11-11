import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
// import styles from './Test.module.scss';
import dynamic from 'next/dynamic'

// const Code = dynamic<ICodeProps>(() =>
//   import('components/ui/Code/Code').then(module => module.Code)
// );

import { useSessionStorage } from '@/lib/hooks'
import {
  checkedAnswersName,
  currentQuestionIndexName,
} from '@/lib/constants/names.storage'
import { Code } from '@/components/ui/code'
import { TestProps } from './test.props'
import { Badge } from '@/components/ui/badge/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnswersList } from './answers-list'

export const Test: FC<TestProps> = ({ questions }) => {
  const router = useRouter()

  const [currentQuestion, setCurrentQuestion] = useSessionStorage<number>(
    currentQuestionIndexName,
    0,
  )
  const [checkedAnswers, setCheckedAnswers] = useSessionStorage<boolean[][]>(
    checkedAnswersName,
    [],
  )

  const initialQuestionsStatus = new Array(questions.length).fill(false)
  initialQuestionsStatus[currentQuestion] = true
  const [questionsStatus, setQuestionsStatus] = useState<boolean[]>(
    initialQuestionsStatus,
  )

  useEffect(() => {
    // Fill checked answers array.
    const checkedAnswersInitial = new Array(questions.length)
    for (let i = 0; i < questions.length; ++i) {
      const answersAmount = questions[i].answers.length
      checkedAnswersInitial[i] = new Array(answersAmount).fill(false)
    }

    setCheckedAnswers(checkedAnswersInitial)
  }, [])

  useEffect(() => {
    window.onpopstate = () => {
      router.push('/')
    }

    return () => {
      setCurrentQuestion(0)
    }
  }, [])

  const isAtLeastOneQuestionChecked = checkedAnswers[currentQuestion]?.indexOf(true) !== -1;
  const isLastQuestion = currentQuestion === questions.length - 1

  const nextButtonHandler = () => {
    if (
      !isLastQuestion &&
      isAtLeastOneQuestionChecked
    ) {
      const tmp = [...questionsStatus]
      tmp[currentQuestion + 1] = true
      setQuestionsStatus(tmp)

      setCurrentQuestion((currentQuestion) => currentQuestion + 1)
    }
  }

  const endTestHandler = () => {
    if (isAtLeastOneQuestionChecked) {
      router.push(`/testResult`)
    }
  }

  return (
    <>
      {questions.length && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-2">
            {questions.map((question, index) => {
              let variant: 'outline' | 'default' | 'secondary' = 'secondary'
              if (currentQuestion == index) {
                variant = 'default'
              } else if (currentQuestion < index) {
                variant = 'outline'
              }

              return (
                <Badge variant={variant} key={question.id} className="text-md">
                  {index + 1}
                </Badge>
              )
            })}
          </div>
          <div className="flex flex-wrap">
            <Card className="mt-4 w-[600px]">
              <CardHeader>
                <CardTitle>{questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent>
                {questions[currentQuestion].codeExample && (
                  <Code
                    codeExample={questions[currentQuestion].codeExample}
                    language="typescript"
                  />
                )}
                {checkedAnswers.length && (
                  <AnswersList
                    checkedAnswers={checkedAnswers}
                    currentQuestion={currentQuestion}
                    setCheckedAnswers={setCheckedAnswers}
                    answers={questions[currentQuestion].answers}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Button
              onClick={isLastQuestion ? endTestHandler : nextButtonHandler}
            >
              {isLastQuestion ? 'Finish test' : 'Next'}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
