import React from 'react';
import { withLayout } from 'layouts/MainLayout';
import { QuestionsList } from 'components';
import { useGetQuestionsQuery } from 'store/questions.api';

const QuestionsPage = () => {
	const { data: questions = [], isLoading } = useGetQuestionsQuery('');
	return (
		<>
			<QuestionsList questions={questions} />
		</>
	);
};

export default withLayout(QuestionsPage);
