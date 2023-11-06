import { useRouter } from 'next/dist/client/router'
import cn from 'clsx'

import { IAnswersListResultProps, ITestResultProps } from './test-result.props'
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
import { Checkbox } from '@/components/ui/checkbox'
// import { Badge, Code } from 'lucide-react';
const styles = {}

const AnswersListResult: React.FC<IAnswersListResultProps> = ({
  answers,
  currentQuestion,
  checkedAnswers,
}) => {
  const answersList = answers

  const getAnswerLabel = (index: number, isMarked: boolean) => {
    // 'correct' - answer marked and it`s correct.
    // 'error' - answer marked and it`s incorrect.
    // 'empty' - answer unmarked and it`s correct.
    // 'missing' - answer unmarked and it`s incorrect.
    let result: 'correct' | 'error' | 'empty' | 'missing' = 'error'

    if (isMarked) {
      answersList[index].isCorrect ? (result = 'correct') : (result = 'error')
    } else {
      !answersList[index].isCorrect ? (result = 'empty') : (result = 'missing')
    }

    const className = 'ml-auto'

    switch (result) {
      case 'error':
        return (
          <Badge variant="destructive" className={className}>
            Error
          </Badge>
        )
      case 'correct':
        return (
          <Badge variant="success" className={className}>
            Correct
          </Badge>
        )
      case 'missing':
        return (
          <Badge variant="outline" className={className}>
            Missing correct
          </Badge>
        )
    }
  }

  return (
    <ul>
      {answers.map(({ answer }, index) => {
        return (
          <li key={answer} className="flex">
            <label className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              <Checkbox
                disabled
                id={answer}
                value={answer}
                checked={checkedAnswers[currentQuestion][index]}
                className="mr-2"
              />
              {answer}
            </label>
            {getAnswerLabel(index, checkedAnswers[currentQuestion][index])}
          </li>
        )
      })}
    </ul>
  )
}

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
        (answer) => answer.isCorrect,
      )

      if (!isArraysEqual(questionAnswersStatus, checkedAnswers[i])) {
        changeUserAnswerStatus(i)
      }
    }

    return () => setCheckedAnswers([])
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
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {`Correct answers:
						${userAnswersStatus.filter((answerStatus) => answerStatus === true).length}
		 				from ${userAnswersStatus.length}`}
        </h3>
        {checkedAnswers.length &&
          questions.map(({ question }, index) => {
            return (
              <Card
                // className={cn(styles.card, {
                //   [styles.successCard]: userAnswersStatus[index],
                //   [styles.errorCard]: !userAnswersStatus[index],
                // })}
                key={index + question}
              >
                <CardHeader>
                  <CardTitle>Question {index + 1}</CardTitle>
                  <hr className="mx-6" />
                  <CardTitle>{questions[index].question}</CardTitle>
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
        <Button onClick={newTestButtonHandler}>New test</Button>
      </div>
    </div>
  )
}
