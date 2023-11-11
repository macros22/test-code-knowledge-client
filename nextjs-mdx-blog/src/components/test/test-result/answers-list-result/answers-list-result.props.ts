import { IAnswer } from '@/lib/interfaces/questions.interface'

export interface AnswersListResultProps {
  answers: IAnswer[]
  currentQuestion: number
  checkedAnswers: boolean[][]
}
