import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import {
  BsChevronDown,
  BsChevronUp,
  BsFillTrashFill,
  BsPencilFill
} from 'react-icons/bs';
import cn from 'clsx';

import { IQuestionCardProps } from './QuestionCard.props';
import { useQuestionsApi } from '@/lib/hooks';
import { IAnswer } from '@/lib/interfaces/questions.interface';
import { Code } from '@/components/ui/code';

export const QuestionCard = ({
  question,
  handleEditButton,
  withEdit = false,
  index
}: IQuestionCardProps): JSX.Element => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<IAnswer[]>([]);

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(isVisible => !isVisible);
  };

  const { api } = useQuestionsApi();
  const handleDeleteButton = async () => {
    await api.deleteQuestion(question.id);
  };

  useEffect(() => {
    setCorrectAnswers(question.answers.filter(answer => answer.isCorrect));
  }, []);

  return (
    <>
      {/* <div className={styles.wrapper}>
        <div className={styles.questionCard}>
          <div className={styles.questionNumber}>
            <h5 className={styles.questionNumberTitle}>
              {'Question '}
              <Badge className={styles.questionNumberBadge} bg="danger">
                {index}
              </Badge>
            </h5>
            {withEdit && (
              <div className={styles.editButtons}>
                <BsPencilFill
                  className={styles.iconButton}
                  onClick={handleEditButton}
                />
                <BsFillTrashFill
                  className={styles.iconButton}
                  onClick={handleDeleteButton}
                />
              </div>
            )}
          </div>
          <div className={styles.question}>
            <hr />
            <h5>{question.question}</h5>
          </div>

          {question.codeExample && (
            <div className={styles.codeExample}>
              <hr />
              <Code codeExample={question.codeExample} language="typescript" />
              <hr />
            </div>
          )}

          <div className={styles.buttons}>
            <div
              onClick={toggleAnswerVisibility}
              className={styles.answerStatusWrapper}
            >
              {isAnswerVisible ? (
                <>
                  <BsChevronUp className={styles.chevronIcon} />
                  <h5 className={styles.answerStatusText}> Hide answer</h5>
                </>
              ) : (
                <>
                  <BsChevronDown className={styles.chevronIcon} />
                  <h5 className={styles.answerStatusText}> Show answer </h5>
                </>
              )}
            </div>
          </div>

          <div
            className={cn({
              [styles.answer]: isAnswerVisible,
              [styles.answerInVisible]: !isAnswerVisible
            })}
          >
            <hr />
            {correctAnswers.length &&
              correctAnswers.map(({ answer }) => {
                return <h5 key={answer}>{answer}</h5>;
              })}
          </div>
        </div>
      </div> */}
    </>
  );
};
