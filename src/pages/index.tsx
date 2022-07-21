import { Categories } from 'components';
import { withLayout } from 'layouts';
import { useGetQuestionsListsSizeQuery } from 'store/questions.api';

const Home = () => {
	const { data, isLoading } = useGetQuestionsListsSizeQuery('');

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			<Categories questionsListsSizes={data} />
		</>
	);
};

export default withLayout(Home);
