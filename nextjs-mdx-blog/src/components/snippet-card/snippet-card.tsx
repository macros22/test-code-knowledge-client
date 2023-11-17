import { ISnippetCardProps } from './snippet-card.props'

import { useSnippetsApi } from '@/lib/hooks'
import { Code } from '@/components/ui/code'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { SnippetForm } from './snippet-form/snippet-form'

export const SnippetCard: FC<ISnippetCardProps> = ({
  snippet,
  index,
  withEdit = false,
}) => {
  const { api } = useSnippetsApi()
  const handleDeleteButton = async () => {
    await api.deleteSnippet(snippet.id)
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
          <h5>{snippet.description}</h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Code codeExample={snippet.snippet} language="tsx" />
      </CardContent>
    </Card>
  )
}