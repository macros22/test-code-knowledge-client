import React from 'react'
// import styles from './ItemsList.module.scss';
import { IItemsListProps } from './items-list.props'
import { BsPlusLg } from 'react-icons/bs'
import { Button, Card, Modal } from 'react-bootstrap'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'
import { IQuestionCardProps } from '@/components/questions/QuestionCard/QuestionCard.props'
import { IQuestionFormProps } from '@/components/questions/QuestionForm/QuestionForm.props'
import { ISnippetCardProps } from '@/components/snippets/SnippetCard/SnippetCard.props'
import { ISnippetFormProps } from '@/components/snippets/SnippetForm/SnippetForm.props'
import { getQuestionExample } from '@/components/questions/QuestionForm/questionExample'
import { getSnippetExample } from '@/components/snippets/SnippetForm/snippetExample'
import { useUser } from '@/lib/hooks'
import { useItemsInfo } from '@/lib/hooks/items/useItemsInfo.hook'
import { IQuestion } from '@/lib/interfaces/questions.interface'
import { ISnippet } from '@/lib/interfaces/snippets.interface'
import { QuestionCard } from '@/components/questions/QuestionCard/QuestionCard'
import { SnippetCard } from '@/components/snippets/SnippetCard/SnippetCard'
import { QuestionForm } from '@/components/questions/QuestionForm/QuestionForm'
import { SnippetForm } from '@/components/snippets/SnippetForm/SnippetForm'
import { Badge } from '@/components/ui/badge/badge'

// const QuestionCard = dynamic<IQuestionCardProps>(() =>
//   import('components/questions/QuestionCard/QuestionCard').then(
//     module => module.QuestionCard
//   )
// );
// const QuestionForm = dynamic<IQuestionFormProps>(() =>
//   import('components/questions/QuestionForm/QuestionForm').then(
//     module => module.QuestionForm
//   )
// );
// const SnippetCard = dynamic<ISnippetCardProps>(() =>
//   import('components/snippets/SnippetCard/SnippetCard').then(
//     module => module.SnippetCard
//   )
// );
// const SnippetForm = dynamic<ISnippetFormProps>(() =>
//   import('components/snippets/SnippetForm/SnippetForm').then(
//     module => module.SnippetForm
//   )
// );

export const ItemsList = ({
  itemsName,
  items,
  category: currentCategory,
}: IItemsListProps): JSX.Element => {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0)

  const [isAddNewItemMode, setIsAddNewItemMode] = React.useState(false)
  const [isEditItemMode, setIsEditItemMode] = React.useState(false)

  const { isLoggedIn, isAdmin } = useUser()

  const { itemsInfo } = useItemsInfo(itemsName)

  const handleAddNewItemButton = () => {
    setIsAddNewItemMode(true)
  }

  const makeHandleEditItemButton = (index: number) => {
    return () => {
      setCurrentItemIndex(index)
      setIsEditItemMode(true)
    }
  }

  const router = useRouter()
  const categoryButtonHandler = (category: string) => {
    router.replace(`/${itemsName}/${itemsInfo[category].categoryURLName}`)
  }

  return (
    // <div className={styles.wrapper}>
    //   <div className={styles.title}>
    //     <div className={styles.categoryButtons}>
    <div>
      <div>
        {/* width: fit-content;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: $spacer * 1.2;
  font-size: 18px; */}
        <div className="mx-auto flex w-4/6 flex-wrap justify-center gap-4">
          {Object.keys(itemsInfo).map((category) => {
            return (
              <Badge
                variant={category == currentCategory ? 'default' : 'outline'}
                className="hover: cursor-pointer p-2 text-lg"
                // className={
                //   category == currentCategory ? '' : '' //styles.inActiveButton
                // }
                key={category}
                onClick={() => categoryButtonHandler(category)}
              >
                {category}

                {/* <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-black p-2 text-sm font-semibold text-white dark:bg-primary dark:text-black"> */}
                <span className="ml-2 inline-flex items-center justify-center rounded-full   text-primary">
                  {/* {`${category}: ${itemsInfo[category].amount}`} */}
                  {itemsInfo[category].amount}
                </span>
              </Badge>
            )
          })}
        </div>

        {isLoggedIn && isAdmin && (
          <BsPlusLg
            // className={styles.addNewItemButton}
            onClick={handleAddNewItemButton}
          />
        )}
      </div>

      {/* <div className={styles.container}>
        <div className={styles.column}> */}
      <div>
        <div className="mx-auto mt-4 flex w-9/12 flex-col gap-5">
          {items && !!items.length ? (
            items.map((item, index) => {
              //@ts-ignore
              return (
                <Card key={item.id}>
                  {itemsName == 'questions' ? (
                    <QuestionCard
                      withEdit={isLoggedIn && isAdmin}
                      handleEditButton={makeHandleEditItemButton(index)}
                      question={item}
                      key={item.id}
                      index={index + 1}
                    />
                  ) : (
                    <SnippetCard
                      withEdit={isLoggedIn && isAdmin}
                      handleEditButton={makeHandleEditItemButton(index)}
                      snippet={item}
                      key={item.id}
                      index={index + 1}
                    />
                  )}
                </Card>
              )
            })
          ) : (
            <Card
            //  className={styles.noItemsCard}
            >{`No ${itemsName} yet`}</Card>
          )}
        </div>
      </div>

      {isLoggedIn && isAddNewItemMode && (
        <Modal
          size="lg"
          show={isAddNewItemMode}
          onHide={() => setIsAddNewItemMode(false)}
        >
          <Modal.Body>
            {itemsName == 'questions' ? (
              <QuestionForm
                questionItem={getQuestionExample(currentCategory)}
                mode="add"
                setIsModalOpen={setIsAddNewItemMode}
              />
            ) : (
              <SnippetForm
                snippetItem={getSnippetExample(currentCategory)}
                mode="add"
                setIsModalOpen={setIsAddNewItemMode}
              />
            )}
          </Modal.Body>
        </Modal>
      )}

      {isLoggedIn && items && isEditItemMode && (
        <Modal
          size="lg"
          show={isEditItemMode}
          onHide={() => setIsEditItemMode(false)}
        >
          <Modal.Body>
            {itemsName == 'questions' ? (
              <QuestionForm
                questionItem={items[currentItemIndex] as IQuestion}
                mode="edit"
                setIsModalOpen={setIsEditItemMode}
              />
            ) : (
              <SnippetForm
                snippetItem={items[currentItemIndex] as ISnippet}
                mode="edit"
                setIsModalOpen={setIsEditItemMode}
              />
            )}
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}
