import { Categories } from 'components';
import { withLayout } from 'layouts';
import { useGetQuestionsListsSizeQuery } from 'store/questions.api';
import { Spinner } from 'react-bootstrap';
const Home = () => {
	const { data, isLoading } = useGetQuestionsListsSizeQuery('');

	if (isLoading) {
		return (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />);
	}

	return (
		<>
			<Categories questionsListsSizes={data} />
		</>
	);
};

export default withLayout(Home);
