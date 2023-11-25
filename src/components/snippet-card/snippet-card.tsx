import { SnippetCardProps } from './snippet-card.props'
import { useSnippetsInfo } from '@/lib/hooks'
import { Code } from '@/components/ui/code'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FC, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { SnippetForm } from './snippet-form/snippet-form'
import { useSnippetsMutation } from '@/lib/hooks/items/snippets/use-snippets-mutation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

export const SnippetCard: FC<SnippetCardProps> = ({
  snippet,
  index,
  withEdit = false,
}) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const { snippetsInfo } = useSnippetsInfo()

  const { deleteSnippet, isDeleteSnippetLoading } = useSnippetsMutation({
    id: snippet.id,
    categoryURLName: snippetsInfo[snippet.category]?.categoryURLName,
  })

  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    deleteSnippet()
    setIsDeleteAlertOpen(false)
  }

  return (
    <Card className="mx-auto mt-4 w-10/12">
      <CardHeader>
        <CardTitle className="flex flex-col">
          <div className="flex">
            <Badge className="mr-auto">
              {'Snippet '}
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
                        Snippet{' '}
                        <Badge className="ml-2 px-3 py-1">{index + 1}</Badge>
                      </DialogTitle>
                      <DialogDescription>description</DialogDescription>
                    </DialogHeader>
                    <SnippetForm snippetItem={snippet} mode="edit" />
                  </DialogContent>
                </Dialog>
                <AlertDialog
                  open={isDeleteAlertOpen}
                  onOpenChange={setIsDeleteAlertOpen}
                >
                  <AlertDialogTrigger asChild>
                    <Button className="ml-4" variant="outline" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteButton}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
          <Separator className="my-4" />
          <h5>{snippet.description}</h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Code codeExample={snippet.snippet} language="tsx" />
      </CardContent>
    </Card>
  )
}
