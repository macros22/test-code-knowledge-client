import React from 'react';
import { Test } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { withLayout } from 'layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { useSessionStorage } from 'hooks';
import { questionsInStorageName } from 'constants/names.storage';

interface TestPageProps extends Record<string, unknown> {
	category: string;
	questionsAmount: number;
}

const TestPage = ({
	category,
	questionsAmount,
}: TestPageProps): JSX.Element => {
	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		category,
		limit: questionsAmount,
	});

	// Save questions in storage to get them in TestResult page.
	const [_, setQuestionsInStorage] = useSessionStorage(
		questionsInStorageName,
		[]
	);

	React.useEffect(() => {
		setQuestionsInStorage(questions);
	}, [questions.length]);

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			{questions && questions.length && category && (
				<Test questions={questions} category={category} />
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps<TestPageProps> = async (
	context
) => {
	const questionsAmount: number = Number(context.query.questionsAmount) || 1;

	let category: string | string[] = context.query.category || 'javascript';

	if (Array.isArray(category)) {
		category = category[0];
	}

	return { props: { questionsAmount, category } };
};

export default withLayout(TestPage);
