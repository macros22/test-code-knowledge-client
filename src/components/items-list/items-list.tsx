import { FC, useState } from 'react'
import { ItemsListProps } from './items-list.props'
import { useRouter } from 'next/router'

import { getSnippetExample } from '@/components/snippet-card/snippet-form/snippet-example'
import { useUser } from '@/lib/hooks'
import { useItemsInfo } from '@/lib/hooks/items/useItemsInfo.hook'
import { QuestionCard } from '@/components/question-card/question-card'
import { SnippetCard } from '@/components/snippet-card/snippet-card'
import { SnippetForm } from '@/components/snippet-card/snippet-form/snippet-form'
import { Badge } from '@/components/ui/badge/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import { Card } from '../ui/card'
import { useSuperTokensSession } from '@/lib/hooks/use-super-tokens-session'

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

export const ItemsList: FC<ItemsListProps> = ({
  itemsName,
  items,
  category: currentCategory,
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isAddNewItemMode, setIsAddNewItemMode] = useState(false)
  const { isLoggedIn } = useUser()

  const { isAdmin } = useSuperTokensSession()

  const { itemsInfo } = useItemsInfo(itemsName)

  const makeHandleEditItemButton = (index: number) => {
    return () => {
      setCurrentItemIndex(index)
      // setIsEditItemMode(true)
    }
  }

  const router = useRouter()
  const categoryButtonHandler = (category: string) => {
    router.replace(`/${itemsName}/${itemsInfo[category].categoryURLName}`)
  }

  return (
    <div>
      <div>
        <div className="mx-auto flex w-4/6 max-w-[400px] flex-wrap justify-center gap-4 2xl:fixed 2xl:right-1 2xl:top-20">
          {Object.keys(itemsInfo).map((category) => {
            return (
              <Badge
                variant={category == currentCategory ? 'default' : 'outline'}
                className="hover: text-md cursor-pointer px-3 py-2"
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
      </div>
      {/* {isLoggedIn && isAdmin && ( */}
        {isAdmin && (
        <Dialog>
          <DialogTrigger className="fixed left-2 top-20">
            {' Add Snippet'}
            <Button variant="outline" size="icon" className="ml-2">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Snippet{' '}
                {/* <Badge className="ml-2 px-3 py-1">{index + 1}</Badge> */}
              </DialogTitle>
              <DialogDescription>description</DialogDescription>
            </DialogHeader>
            <SnippetForm
              snippetItem={getSnippetExample(currentCategory)}
              mode="add"
            />
          </DialogContent>
        </Dialog>
      )}
      <div>
        <div className="mx-auto mt-4 flex w-9/12 flex-col gap-5">
          {Boolean(items?.length) ? (
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
                      index={index}
                    />
                  ) : (
                    // <></>
                    <SnippetCard
                      withEdit={isLoggedIn && isAdmin}
                      handleEditButton={makeHandleEditItemButton(index)}
                      snippet={item}
                      key={item.id}
                      index={index}
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

      {/* {isLoggedIn && isAddNewItemMode && ( */}
      {isLoggedIn && (
        <>
          {/* <Modal
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
                // setIsModalOpen={setIsAddNewItemMode}
              />
            )}
          </Modal.Body>
        </Modal> */}
        </>
      )}

      {/* 

      {isLoggedIn && items && isEditItemMode && (
        <Dialog
          // size="lg"
          // show={isEditItemMode}
          // onHide={() => setIsEditItemMode(false)}
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
        </Dialog>
      )} */}
    </div>
  )
}
