import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { TestResult } from 'components';
import { useSessionStorage } from 'hooks';
import { questionsInStorageName } from 'constants/names.storage';

const TestResultPage = (): JSX.Element => {
	const [questions, _] = useSessionStorage(questionsInStorageName, []);

	return (
		<>{questions && questions.length && <TestResult questions={questions} />}</>
	);
};

export default withLayout(TestResultPage);
