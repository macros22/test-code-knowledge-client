import { Button } from '@/components/ui/button'
import { ILoadItemsButtonProps } from './load-items-button.props'
import { useQuestions } from '@/lib/hooks'
import { Loader2 } from 'lucide-react'

export const LoadItemsButton = ({
  skip,
  limit,
  category,
}: ILoadItemsButtonProps): JSX.Element => {
  const { size, setSize, isReachingEnd, isLoadingMore } = useQuestions({
    skip,
    limit,
    category,
  })

  const content = isLoadingMore ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      'Loading...'
    </>
  ) : isReachingEnd ? null : (
    'Load more'
  )

  return (
    <>
      {content && (
        <div className="my-4 flex justify-center">
          <Button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {content}
          </Button>
        </div>
      )}
    </>
  )
}
