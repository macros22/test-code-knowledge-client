import { TechnologyList } from 'components';
import { withLayout } from 'layouts/MainLayout';
import { useGetQuestionsListsSizeQuery } from 'store/questions.api';

const Home = () => {
	const { data, isLoading } = useGetQuestionsListsSizeQuery('');

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			<TechnologyList questionsListsSizes={data.questionsListsSizes} />
		</>
	);
};

export default withLayout(Home);
