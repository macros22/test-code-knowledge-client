import React from 'react';
import { withLayout } from 'layouts';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'libs/helpers/get-param-from-query';
import { useSessionStorage } from 'libs/hooks';
import { snippetsCategoryName } from 'libs/constants/names.storage';
import { Spinner } from 'react-bootstrap';
import { SWRConfig } from 'swr';
import { ISnippet, ISnippetsPageProps } from 'libs/interfaces/snippets.interface';
import { getSnippetsUrl } from 'libs/helpers/get-snippets-url';
import { snippetsApi } from 'libs/api/snippets.api';
import { useSnippets } from 'libs/hooks/snippets/useSnippets';
import { List } from 'components/ItemsList/List';
import { SNIPPETS_BASE_URL } from 'libs/constants/urls';

export const getServerSideProps: GetServerSideProps<
	ISnippetsPageProps
> = async (context) => {
	const categoryURLName = getQueryParametr(context, 'category') || '';

	const skip = Number(getQueryParametr(context, 'skip'));
	const limit = Number(getQueryParametr(context, 'limit'));

	const snippetsUrl = getSnippetsUrl({
		categoryURLName,
		skip,
		limit,
	});

	const snippets = await snippetsApi().getSnippets(snippetsUrl);
	const snippetsInfo = await snippetsApi().getSnippetsInfo(SNIPPETS_BASE_URL);
	let category = '';
	if (snippetsInfo) {
		category = Object.keys(snippetsInfo).find(key => snippetsInfo[key].categoryURLName == categoryURLName) || '';
	}

	return {
		props: {
			category,
			skip,
			limit,
			fallback: {
				[snippetsUrl]: snippets
			}
		},

	}

};

const SnippetsPage = ({ category, skip, limit, fallback }: ISnippetsPageProps): JSX.Element => {

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
	}, [category])

	if (isLoadingSnippets) {
		return (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />);
	}

	return (
		<SWRConfig value={{ fallback }}>
			<List itemsName='snippets' items={snippets} category={category} />
		</SWRConfig>
	);
};

export default withLayout('main', SnippetsPage);



