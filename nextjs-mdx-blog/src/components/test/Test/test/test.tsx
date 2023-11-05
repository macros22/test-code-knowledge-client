import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
// import styles from './Test.module.scss';
import dynamic from 'next/dynamic'

// const Code = dynamic<ICodeProps>(() =>
//   import('components/ui/Code/Code').then(module => module.Code)
// );

import { Button } from 'react-bootstrap'
import { AnswersList } from '../answers-list/answers-list'
import { useSessionStorage } from '@/lib/hooks'
import {
  checkedAnswersName,
  currentQuestionIndexName,
} from '@/lib/constants/names.storage'
import { Code } from '@/components/ui/code'
import { TestProps } from './test.props'

const styles = {}

export const Test = ({ questions }: TestProps): JSX.Element => {
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

  // Handlers.
  const nextButtonHandler = () => {
    if (
      currentQuestion < questions.length - 1 &&
      checkedAnswers[currentQuestion].indexOf(true) !== -1
    ) {
      const tmp = [...questionsStatus]
      tmp[currentQuestion + 1] = true
      setQuestionsStatus(tmp)

      setCurrentQuestion((currentQuestion) => currentQuestion + 1)
    }
  }

  const endTestHandler = () => {
    if (checkedAnswers[currentQuestion].indexOf(true) !== -1) {
      router.push(`/testResult`)
    }
  }

  return (
    <>
      <h1>asdasd</h1>
      {questions.length && (
        <div className={styles.wrapper}>
          <div className={styles.questionNumbers}>
            {questions.map((question, index) => {
              let spanStyle = ''
              if (currentQuestion == index) {
                spanStyle = styles.currentItem
              } else if (currentQuestion < index) {
                spanStyle = styles.nextItem
              }

              return (
                <span className={spanStyle} key={question.id}>
                  {index + 1}
                </span>
              )
            })}
          </div>
          <div className={styles.content}>
            <h4 className={styles.questionTitle}>
              {questions[currentQuestion].question}
            </h4>
            <hr />
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
          </div>
          <div className={styles.buttons}>
            {currentQuestion < questions.length - 1 ? (
              <Button onClick={nextButtonHandler}>Next</Button>
            ) : (
              <Button onClick={endTestHandler}>Finish test</Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
