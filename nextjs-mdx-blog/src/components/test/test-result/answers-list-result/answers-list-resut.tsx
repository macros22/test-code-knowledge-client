import { FC } from "react"
import { AnswersListResultProps } from "./answers-list-result.props"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export const AnswersListResult: FC<AnswersListResultProps> = ({
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
            <li key={answer} className="mt-1 flex">
              <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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