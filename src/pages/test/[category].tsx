import React from 'react';
import { Test } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { withLayout } from 'layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { useSessionStorage } from 'hooks';
import { categoryName, questionsInStorageName } from 'constants/names.storage';
import { getQueryParametr } from 'helpers/get-param-from-query';

interface TestPageProps extends Record<string, unknown> {
	category: string;
	questionsAmount: number;
}

export const getServerSideProps: GetServerSideProps<TestPageProps> = async (
	context
) => {
	const questionsAmount =
		Number(getQueryParametr(context, 'questionsAmount')) || 1;

	const category = getQueryParametr(context, 'category') || 'javascript';
	return { props: { category, questionsAmount } };
};


const TestPage = ({
	category,
	questionsAmount,
}: TestPageProps): JSX.Element => {
	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		category,
		limit: questionsAmount,
	});

	const [_, setCategoryInStorage] = useSessionStorage(
		categoryName,
		category
	);

	React.useEffect(() => {
		setCategoryInStorage(category);
	}, [category])

	// Save questions in storage to get them in TestResult page.
	const [__, setQuestionsInStorage] = useSessionStorage(
		questionsInStorageName,
		[]
	);


	React.useEffect(() => {
		setQuestionsInStorage(questions);
	}, [questions.length]);

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			{questions && questions.length && (
				<Test questions={questions}/>
			)}
		</>
	);
};

export default withLayout(TestPage);
