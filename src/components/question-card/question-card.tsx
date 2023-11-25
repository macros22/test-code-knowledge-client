import { FC, useEffect, useState } from 'react'

import { QuestionCardProps } from './question-card.props'
import { useQuestionsApi } from '@/lib/hooks'
import { IAnswer } from '@/lib/interfaces/questions.interface'
import { Code } from '@/components/ui/code'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react'
import { SnippetForm } from '../snippet-card/snippet-form/snippet-form'
import { DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { QuestionForm } from './question-form'

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  handleEditButton,
  withEdit = false,
  index,
}) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState<IAnswer[]>([])

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible((isVisible) => !isVisible)
  }

  const { api } = useQuestionsApi()
  const handleDeleteButton = async () => {
    await api.deleteQuestion(question.id)
  }

  useEffect(() => {
    setCorrectAnswers(question.answers.filter((answer) => answer.isCorrect))
  }, [])

  return (
    <Card className="mx-auto mt-4 w-10/12">
      <CardHeader>
        <CardTitle className="flex flex-col">
          <div className="flex">
            <Badge className="mr-auto">
              {'Question '}
              {index + 1}
            </Badge>

            {withEdit && (
              <>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline" size="icon">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Question{' '}
                        <Badge className="ml-2 px-3 py-1">{index + 1}</Badge>
                      </DialogTitle>
                      <DialogDescription>description</DialogDescription>
                    </DialogHeader>
                    <QuestionForm questionItem={question} mode="edit" />
                  </DialogContent>
                </Dialog>
                <Button
                  className="ml-4"
                  variant="outline"
                  size="icon"
                  onClick={handleDeleteButton}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <Separator className="my-4" />
          <h5>{question.question}</h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {question.codeExample && (
          <Code codeExample={question.codeExample} language="tsx" />
        )}
        <Collapsible open={isAnswerVisible} onOpenChange={setIsAnswerVisible}>
          <CollapsibleTrigger className="mt-3 flex gap-2">
            {isAnswerVisible ? (
              <>
                <ChevronUpIcon />
                <h5> Hide answer </h5>
              </>
            ) : (
              <>
                <ChevronDownIcon />
                <h5> Show answer </h5>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Separator className="my-3" />
            {correctAnswers.length &&
              correctAnswers.map(({ answer }) => {
                return <h5 key={answer}>{answer}</h5>
              })}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
