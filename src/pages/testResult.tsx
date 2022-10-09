import React from 'react';
import { TestResult } from 'components';
import { useSessionStorage } from 'libs/hooks';
import { questionsInStorageName } from 'libs/constants/names.storage';
import { withLayout } from 'layouts';

const TestResultPage = (): JSX.Element => {
	const [questions] = useSessionStorage(questionsInStorageName, []);

	return (
		<>
			{questions && questions.length &&
				<TestResult questions={questions} />}
		</>
	);
};

export default withLayout('main', TestResultPage);
