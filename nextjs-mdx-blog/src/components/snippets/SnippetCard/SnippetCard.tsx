import React from 'react';
import { ISnippetCardProps } from './SnippetCard.props';
import {
  BsPencilFill,
  BsFillTrashFill,
  BsChevronDown,
  BsChevronUp
} from 'react-icons/bs';

import { Badge } from 'react-bootstrap';
import { useSnippetsApi } from '@/lib/hooks';
import { Code } from '@/components/ui/code';

export const SnippetCard = ({
  snippet,
  handleEditButton,
  withEdit = false,
  index
}: ISnippetCardProps): JSX.Element => {
  const { api } = useSnippetsApi();
  const handleDeleteButton = async () => {
    await api.deleteSnippet(snippet.id);
  };

  return (
    <>
      {/* <div className={styles.wrapper}>
        <div className={styles.snippetCard}>
          <div className={styles.snippetNumber}>
            <h5 className={styles.snippetNumberTitle}>
              {'Snippet '}
              <Badge className={styles.snippetNumberBadge} bg="danger">
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
          <div className={styles.description}>
            <hr />
            <h5>{snippet.description}</h5>
          </div>

          <div className={styles.snippet}>
            <hr />
            <Code codeExample={snippet.snippet} language="typescript" />
          </div>
        </div>
      </div> */}
      <Code codeExample={snippet.snippet} language="tsx" />
    </>
  );
};