import { useRouter } from 'next/dist/client/router'
import cn from 'clsx'

import { ITestResultProps } from './test-result.props'
import { useEffect, useState } from 'react'
import {
  checkedAnswersName,
  questionsCategoryName,
} from '@/lib/constants/names.storage'
import { isArraysEqual } from '@/lib/helpers/is-arrays-equal'
import { useSessionStorage, useQuestionsInfo } from '@/lib/hooks'

import { Badge } from '@/components/ui/badge/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code } from '@/components/ui/code'
import { Button } from '@/components/ui/button'
import { AnswersListResult } from './answers-list-result'


export const TestResult = ({ questions }: ITestResultProps): JSX.Element => {
  // Before checking all user answers are true.
  const [userAnswersStatus, setUserAnswersStatus] = useState<boolean[]>(
    new Array(questions.length).fill(true),
  )
  const changeUserAnswerStatus = (questionIndex: number) => {
    setUserAnswersStatus((userAnswersStatus) => {
      const newUserAnswersStatus = [...userAnswersStatus]

      newUserAnswersStatus[questionIndex] = !newUserAnswersStatus[questionIndex]

      return newUserAnswersStatus
    })
  }

  const [checkedAnswers, setCheckedAnswers] = useSessionStorage<boolean[][]>(
    checkedAnswersName,
    [],
  )

  useEffect(() => {
    for (let i = 0; i < questions.length; ++i) {
      const questionAnswersStatus = questions[i].answers.map(
        ({ isCorrect }) => isCorrect,
      )

      if (!isArraysEqual(questionAnswersStatus, checkedAnswers[i])) {
        changeUserAnswerStatus(i)
      }
    }

    // return () => setCheckedAnswers([])
  }, [])

  useEffect(() => {
    window.onpopstate = () => {
      router.push('/')
    }
  }, [])

  const router = useRouter()
  const [category] = useSessionStorage(questionsCategoryName, '')

  const { questionsInfo } = useQuestionsInfo()

  const newTestButtonHandler = () => {
    if (category) {
      router.push(
        `/test/${questionsInfo[category].categoryURLName}?questionsAmount=${questions.length}`,
      )
    }
  }

  return (
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="">
          {`Correct answers:
						${userAnswersStatus.filter((answerStatus) => Boolean(answerStatus)).length}
		 				from ${userAnswersStatus.length}`}
        </h3>
        <div className="flex flex-col gap-4 items-center justify-center">
        {checkedAnswers.length &&
          questions.map(({ question }, index) => {
            return (
              <Card
                className={cn(
                  'w-[640px]',
                  {
                  // "border-success": userAnswersStatus[index],
                  // "border-destructive": !userAnswersStatus[index],
                })}
                key={index + question}
              >
                <CardHeader>
                  <CardTitle className="flex gap-4 align-baseline">
                    {questions[index].question}
                    <Badge variant="success">Question {index + 1}</Badge>
                  </CardTitle>
                </CardHeader>
                <hr className="mx-6" />
                <CardContent className="pt-6">
                  {questions[index].codeExample && (
                    <Code
                      codeExample={questions[index].codeExample}
                      language="typescript"
                    />
                  )}

                  <AnswersListResult
                    answers={questions[index].answers}
                    currentQuestion={index}
                    checkedAnswers={checkedAnswers}
                  />
                </CardContent>
              </Card>
            )
          })}
          </div>
          <Button onClick={newTestButtonHandler}>New test</Button>
      </div>
  )
}
