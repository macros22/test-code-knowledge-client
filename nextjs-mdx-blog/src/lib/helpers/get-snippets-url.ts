import { SNIPPETS_BASE_URL } from '../constants/urls'

interface ISnippetsProps {
  categoryURLName: string
  skip: number | undefined
  limit: number | undefined
}

export const getSnippetsUrl = ({
  categoryURLName,
  skip,
  limit,
}: ISnippetsProps) => {
  const searchParams =
    (skip == 0 || skip) && limit ? `?skip=${skip}&limit=${limit}` : ''

  return SNIPPETS_BASE_URL + '/' + categoryURLName + searchParams
}
