import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { TestResult } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';

const TestResultPage: React.FC = () => {
	const questionsAmount = 5;
	const { data: questions = [], isLoading } =
		useGetQuestionsQuery(questionsAmount);

	return (
		<>
			{questions && questions.length && (
				<TestResult questions={questions} questionsAmount={questionsAmount} />
			)}
		</>
	);
};

export default withLayout(TestResultPage);
