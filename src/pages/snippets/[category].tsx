import React from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'libs/helpers/get-param-from-query';
import { useSessionStorage } from 'libs/hooks';
import { snippetsCategoryName } from 'libs/constants/names.storage';
import { Button, Spinner } from 'react-bootstrap';
import { SWRConfig } from 'swr';
import {
  ISnippet,
  ISnippetsPageProps
} from 'libs/interfaces/snippets.interface';
import { getSnippetsUrl } from 'libs/helpers/get-snippets-url';
import { snippetsApi } from 'libs/api/snippets.api';
import { useSnippets } from 'libs/hooks/items/snippets/useSnippets';
import { ItemsList } from '../../components/ItemsList/ItemsList/ItemsList';
import { SNIPPETS_BASE_URL } from 'libs/constants/urls';
import { withLayout } from 'layouts/with-layout';
import { ITEMS_PER_PAGE } from 'libs/constants/items-per-page';
import { LoadItemsButton } from 'components/ItemsList/LoadItemsButton/LoadItemsButton';

export const getServerSideProps: GetServerSideProps<
  ISnippetsPageProps
> = async context => {
  const categoryURLName = getQueryParametr(context, 'category') || '';

  const skip = Number(getQueryParametr(context, 'skip')) || 0;
  const limit = Number(getQueryParametr(context, 'limit')) || ITEMS_PER_PAGE;

  const snippetsUrl = getSnippetsUrl({
    categoryURLName,
    skip,
    limit
  });

  const snippets = await snippetsApi().getSnippets(snippetsUrl);
  const snippetsInfo = await snippetsApi().getSnippetsInfo(SNIPPETS_BASE_URL);
  let category = '';
  if (snippetsInfo) {
    category =
      Object.keys(snippetsInfo).find(
        key => snippetsInfo[key].categoryURLName == categoryURLName
      ) || '';
  }

  return {
    props: {
      category,
      skip,
      limit,
      fallback: {
        [snippetsUrl]: snippets
      }
    }
  };
};

const SnippetsPage = ({
  category,
  skip,
  limit,
  fallback
}: ISnippetsPageProps): JSX.Element => {
  const { snippets, isLoadingSnippets } = useSnippets({
    skip,
    limit,
    category
  });

  const [, setCategoryInStorage] = useSessionStorage(
    snippetsCategoryName,
    category
  );

  React.useEffect(() => {
    setCategoryInStorage(category);
  }, [category]);

  if (isLoadingSnippets) {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }

  return (
    <SWRConfig value={{ fallback }}>
      <ItemsList itemsName="snippets" items={snippets} category={category} />
      <LoadItemsButton skip={skip} limit={limit} category={category} />
    </SWRConfig>
  );
};

export default withLayout('main', SnippetsPage);
