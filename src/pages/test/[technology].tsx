import React from 'react';
// import { withLayout } from "layouts/MainLayout";
// import { useAppDispatch, useAppSelector } from "store/hooks";
import { Test } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { withLayout } from 'layouts/MainLayout';
import { useRouter } from 'next/router';

const TestPage: React.FC = () => {
	const router = useRouter();
	const { technology } = router.query;

	const questionsAmount = 1;
	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		technology,
		limit: questionsAmount,
	});

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			{questions && questions.length && (
				<Test questions={questions} questionsAmount={questionsAmount} />
			)}
		</>
	);
};

export default withLayout(TestPage);
