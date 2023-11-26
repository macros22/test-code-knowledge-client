import { Button } from '@/components/ui/button'
import { LoadItemsButtonProps } from './load-items-button.props'
import { useQuestions } from '@/lib/hooks'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

export const LoadItemsButton: FC<LoadItemsButtonProps> = ({
  skip,
  limit,
  category,
}) => {
  const { setSize, isReachingEnd, isLoadingMore } = useQuestions({
    skip,
    limit,
    category,
  })

  const content = isLoadingMore ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
            onClick={() => setSize((size) => size + 1)}
          >
            {content}
          </Button>
        </div>
      )}
    </>
  )
}
