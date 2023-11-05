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

import { Badge as Tag } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Code } from '@/components/ui/code'
import { Button } from '@/components/ui/button'
// import { Tag, Code } from 'lucide-react';
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

    switch (result) {
      case 'error':
        return (
          <Tag className={styles.tag} color="error">
            Error
          </Tag>
        )
      case 'correct':
        return (
          <Tag className={styles.tag} color="success">
            Correct
          </Tag>
        )
      case 'missing':
        return (
          <Tag className={styles.tag} color="info">
            Missing correct
          </Tag>
        )
    }
  }

  return (
    <div className={styles.answersList}>
      {answers.map((answer, index) => {
        return (
          <li className={styles.answer} key={answer.answer}>
            {/* <Form.Check
              className={styles.formCheck}
              type={'checkbox'}
              id={answer.answer}
              label={answer.answer}
              value={answer.answer}
              checked={checkedAnswers[currentQuestion][index]}
              disabled
            /> */}
            <div className={styles.tag}>
              {getAnswerLabel(index, checkedAnswers[currentQuestion][index])}
            </div>
          </li>
        )
      })}
    </div>
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
          questions.map((question, index) => {
            return (
              <Card
                className={cn(styles.card, {
                  [styles.successCard]: userAnswersStatus[index],
                  [styles.errorCard]: !userAnswersStatus[index],
                })}
                key={index + question.question}
              >
                <h5 className={styles.questionTitle}>Question {index + 1}</h5>
                <hr />
                <h5 className={styles.questionTitle}>
                  {questions[index].question}
                </h5>
                <hr />
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
              </Card>
            )
          })}
        <Button onClick={newTestButtonHandler}>New test</Button>
      </div>
    </div>
  )
}
