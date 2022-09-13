import React from 'react';
import { withLayout } from 'layouts';
import { QuestionsList } from 'components';
import { GetServerSideProps, GetStaticProps } from 'next';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { useQuestions, useSessionStorage } from 'hooks';
import { categoryName } from 'constants/names.storage';
import { Spinner } from 'react-bootstrap';
import { Category, Question } from 'interfaces/questions.interface';
import { questionsApi } from 'libs/questions.api';
import { getQuestionsUrl } from 'helpers/get-questions-url';
import { SWRConfig } from 'swr';

interface QuestionsPageProps extends Record<string, unknown> {
	category: Category;
	skip: number;
	limit: number;
	fallback: Record<string, Question[] | null>;
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


	const skip = Number(getQueryParametr(context, 'skip'));
	const limit = Number(getQueryParametr(context, 'limit'));

	const questionsUrl = getQuestionsUrl({
		category,
		skip,
		limit,
	});

	const questions = await questionsApi().getQuestions(questionsUrl);
	// console.log(context);
	console.log(questions)
	return {
		props: {
			category,
			skip,
			limit,
			fallback: {
				[questionsUrl]: questions
			}
		},

	}

};

const QuestionsPage = ({ category, skip, limit, fallback }: QuestionsPageProps): JSX.Element => {

	const { questions, isLoadingQuestions } = useQuestions({
		skip,
		limit,
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
		<SWRConfig value={{ fallback }}>
			<QuestionsList questions={questions} category={category} />
		</SWRConfig>
	);
};

export default withLayout('main', QuestionsPage);



