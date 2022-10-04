import React from 'react';
import { withLayout } from 'layouts';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { useSessionStorage } from 'hooks';
import { snippetsCategoryName } from 'constants/names.storage';
import { Spinner } from 'react-bootstrap';
import { SWRConfig } from 'swr';
import { ISnippet } from 'interfaces/snippets.interface';
import { getSnippetsUrl } from 'helpers/get-snippets-url';
import { snippetsApi } from 'libs/snippets.api';
import { useSnippets } from 'hooks/snippets/useSnippets';
import { List } from 'components/List/List';

interface ISnippetsPageProps extends Record<string, unknown> {
	category: string;
	skip: number;
	limit: number;
	fallback: Record<string, ISnippet[] | null>;
}

export const getServerSideProps: GetServerSideProps<
	ISnippetsPageProps
> = async (context) => {
	const category = getQueryParametr(context, 'category') || 'JavaScript';

	const skip = Number(getQueryParametr(context, 'skip'));
	const limit = Number(getQueryParametr(context, 'limit'));

	const snippetsUrl = getSnippetsUrl({
		category,
		skip,
		limit,
	});

	const snippets = await snippetsApi().getSnippets(snippetsUrl);
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

	const [_, setCategoryInStorage] = useSessionStorage(
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



