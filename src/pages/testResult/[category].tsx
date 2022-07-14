import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { TestResult } from 'components';
import { useSessionStorage } from 'hooks';
import { questionsInStorageName } from 'constants/names.storage';
import { GetServerSideProps } from 'next';

interface TestResultPageProps extends Record<string, unknown> {
	category: string;
}

const TestResultPage = ({ category }: TestResultPageProps): JSX.Element => {
	const [questions, _] = useSessionStorage(questionsInStorageName, []);

	return (
		<>
			{questions && questions.length && (
				<TestResult questions={questions} category={category} />
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps<TestResultPageProps> = async (
	context
) => {

	let category: string | string[] = context.query.category || 'javascript';

	if (Array.isArray(category)) {
		category = category[0];
	}

	return { props: { category } };
};

export default withLayout(TestResultPage);
