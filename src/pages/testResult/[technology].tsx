import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { TestResult } from 'components';
import { useSessionStorage } from 'hooks';
import { questionsInStorageName } from 'constants/names.storage';
import { GetServerSideProps } from 'next';

interface TestResultPageProps extends Record<string, unknown> {
	technology: string;
}

const TestResultPage = ({ technology }: TestResultPageProps): JSX.Element => {
	const [questions, _] = useSessionStorage(questionsInStorageName, []);

	return (
		<>
			{questions && questions.length && (
				<TestResult questions={questions} technology={technology} />
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps<TestResultPageProps> = async (
	context
) => {

	let technology: string | string[] = context.query.technology || 'javascript';

	if (Array.isArray(technology)) {
		technology = technology[0];
	}

	return { props: { technology } };
};

export default withLayout(TestResultPage);
