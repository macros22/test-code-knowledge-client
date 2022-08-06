import React from 'react';
import { withLayout } from 'layouts';
import { QuestionsList } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { GetServerSideProps } from 'next';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { useSessionStorage } from 'hooks';
import { categoryName } from 'constants/names.storage';

interface QuestionsPageProps extends Record<string, unknown> {
	category: string;
}

export const getServerSideProps: GetServerSideProps<
	QuestionsPageProps
> = async (context) => {
	const category = getQueryParametr(context, 'category') || 'javascript';

	return { props: { category } };
};

const QuestionsPage = ({ category }: QuestionsPageProps): JSX.Element => {
	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		category,
		limit: 1,
	});

	const [_, setCategoryInStorage] = useSessionStorage(
		categoryName,
		category
	);

	React.useEffect(() => {
		setCategoryInStorage(category);
	}, [category])

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			<QuestionsList withEdit={true} questions={questions} />
		</>
	);
};

export default withLayout(QuestionsPage);



