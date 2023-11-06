import { deepCopy } from '@/lib/helpers/deep-copy'
import { AnswersListProps } from './answers-list.props'
import { Form } from 'react-bootstrap'
import { Checkbox } from '@/components/ui/checkbox'
// import styles from './AnswersList.module.scss';
const styles = {}

export const AnswersList = ({
  setCheckedAnswers,
  checkedAnswers,
  answers,
  currentQuestion,
}: AnswersListProps): JSX.Element => {
  const handleOnChange = (answerIndex: number) => {
    setCheckedAnswers((checkedAnswers) => {
      const newCheckedAnswers = deepCopy(checkedAnswers)
      newCheckedAnswers[currentQuestion][answerIndex] =
        !newCheckedAnswers[currentQuestion][answerIndex]
      return newCheckedAnswers
    })
  }

  return (
    <ul className="mt-4 list-none">
      {answers.map(({ answer }, index) => {
        return (
          <li key={answer}>
            <label
              htmlFor="terms"
              className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <Checkbox
                id={answer}
                value={answer}
                onCheckedChange={() => handleOnChange(index)}
                checked={checkedAnswers[currentQuestion][index]}
                className="mr-2"
              />
              {answer}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
