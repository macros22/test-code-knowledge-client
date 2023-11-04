
import { Button } from 'react-bootstrap';
import { ILoadItemsButtonProps } from './LoadItemsButton.props';
import { useQuestions } from '@/lib/hooks';


export const LoadItemsButton = ({
  skip,
  limit,
  category
}: ILoadItemsButtonProps): JSX.Element => {
  const { size, setSize, isReachingEnd, isLoadingMore } = useQuestions({
    skip,
    limit,
    category
  });

  return (
    // <div className={styles.wrapper}>
      <div >
      <Button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
          ? 'No more items'
          : 'Load more'}
      </Button>
    </div>
  );
};
