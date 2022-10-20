import React from 'react';
import { useSessionStorage } from 'libs/hooks';
import { questionsInStorageName } from 'libs/constants/names.storage';
import { withLayout } from 'layouts';

import dynamic from "next/dynamic";
const TestResult = dynamic(() => import('../components/test/TestResult/TestResult'));

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
