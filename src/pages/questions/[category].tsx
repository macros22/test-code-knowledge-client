import React from 'react';
import { withLayout } from 'layouts';
import { QuestionsList } from 'components';
import { GetServerSideProps } from 'next';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { useQuestions, useSessionStorage } from 'hooks';
import { categoryName } from 'constants/names.storage';
import { Spinner } from 'react-bootstrap';
import { Category } from 'interfaces/questions.interface';

interface QuestionsPageProps extends Record<string, unknown> {
	category: Category;
}

export const getServerSideProps: GetServerSideProps<
	QuestionsPageProps
> = async (context) => {
	const categoryStr = getQueryParametr(context, 'category') || 'javascript';

	let category: Category = Category.JAVASCRIPT;

	switch (categoryStr) {
		case 'nodejs':
			category = Category.NODEJS;
			break;
		case 'typescript':
			category = Category.TYPESCRIPT;
			break;
		case 'javascript':
		default:
			category = Category.JAVASCRIPT;
	}

	return { props: { category } };
};

const QuestionsPage = ({ category }: QuestionsPageProps): JSX.Element => {

	const { questions, isLoadingQuestions } = useQuestions({
		// skip: 1,
		// limit: 1,
		category
	});

	const [_, setCategoryInStorage] = useSessionStorage(
		categoryName,
		category
	);

	React.useEffect(() => {
		setCategoryInStorage(category);
	}, [category])

	if (isLoadingQuestions) {
		return (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />);
	}

	return (
		<>
			<QuestionsList questions={questions} category={category}/>
		</>
	);
};

export default withLayout('main', QuestionsPage);



