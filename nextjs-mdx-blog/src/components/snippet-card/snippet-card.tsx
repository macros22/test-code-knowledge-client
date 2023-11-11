import { ISnippetCardProps } from './snippet-card.props'

import { useSnippetsApi } from '@/lib/hooks'
import { Code } from '@/components/ui/code'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FC } from 'react'
import { SeparatorWithContent } from '../ui/separator-with-content/HrWithContent'

export const SnippetCard: FC<ISnippetCardProps> = ({
  snippet,
  handleEditButton,
  index,
  withEdit = false,
}) => {
  const { api } = useSnippetsApi()
  const handleDeleteButton = async () => {
    await api.deleteSnippet(snippet.id)
  }

  return (
    <>
      <Card className="mt-4 w-10/12 mx-auto">
        <CardHeader>
          <CardTitle className="flex flex-col">
          <SeparatorWithContent>asdasd</SeparatorWithContent>
            <div className="flex">
              <Badge>
                {'Snippet '}
                {index}
              </Badge>
              {withEdit && (
                <>
                  <Button
                    className="ml-auto"
                    variant="outline"
                    size="icon"
                    onClick={handleEditButton}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
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
            <Separator className='my-4'/>
            <h5>{snippet.description}</h5>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Code codeExample={snippet.snippet} language="tsx" />
        </CardContent>
      </Card>
    </>
  )
}
