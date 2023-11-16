import React, { useEffect } from 'react'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'

import { Spinner } from 'react-bootstrap'
import { SWRConfig } from 'swr'
import { withLayout } from '@/layouts'
import { snippetsApi } from '@/lib/api/snippets.api'
import { ITEMS_PER_PAGE } from '@/lib/constants/items-per-page'
import { snippetsCategoryName } from '@/lib/constants/names.storage'
import { SNIPPETS_BASE_URL } from '@/lib/constants/urls'
import { getQueryParametr } from '@/lib/helpers/get-param-from-query'
import { getSnippetsUrl } from '@/lib/helpers/get-snippets-url'
import { useSnippets, useSessionStorage } from '@/lib/hooks'
import { SnippetsPageProps } from '@/lib/interfaces/snippets.interface'
import { ItemsList, LoadItemsButton } from '@/components/items-list'

export const getServerSideProps: GetServerSideProps<SnippetsPageProps> = async (
  context,
) => {
  const categoryURLName = getQueryParametr(context, 'category') || ''

  const skip = Number(getQueryParametr(context, 'skip')) || 0
  const limit = Number(getQueryParametr(context, 'limit')) || ITEMS_PER_PAGE

  const snippetsUrl = getSnippetsUrl({
    categoryURLName,
    skip,
    limit,
  })

  const snippets = await snippetsApi().getSnippets(snippetsUrl)
  const snippetsInfo = await snippetsApi().getSnippetsInfo(SNIPPETS_BASE_URL)
  let category = ''
  if (snippetsInfo) {
    category =
      Object.keys(snippetsInfo).find(
        (key) => snippetsInfo[key].categoryURLName == categoryURLName,
      ) || ''
  }

  return {
    props: {
      category,
      skip,
      limit,
      fallback: {
        [snippetsUrl]: snippets,
      },
    },
  }
}

const SnippetsPage: NextPage<SnippetsPageProps> = ({
  category,
  skip,
  limit,
  fallback,
}) => {
  const { snippets, isLoadingSnippets } = useSnippets({
    skip,
    limit,
    category,
  })

  const [, setCategoryInStorage] = useSessionStorage(
    snippetsCategoryName,
    category,
  )

  useEffect(() => {
    setCategoryInStorage(category)
  }, [category])

  if (isLoadingSnippets) {
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    )
  }

  return (
    <SWRConfig value={{ fallback }}>
      <ItemsList itemsName="snippets" items={snippets} category={category} />
      <LoadItemsButton skip={skip} limit={limit} category={category} />
    </SWRConfig>
  )
}

export default withLayout('main', SnippetsPage)
