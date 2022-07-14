import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { QuestionsList } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';
import { useRouter } from 'next/router';

const QuestionsPage = () => {
	const router = useRouter();
	const { category } = router.query;

	const { data: questions = [], isLoading } = useGetQuestionsQuery({
		category,
		limit: 1,
	});


	if (isLoading) return <h1>Loading...</h1>;

	
	return (
		<>
			<QuestionsList questions={questions} />
		</>
	);
};

export default withLayout(QuestionsPage);
