import { Categories } from 'components';
import { useQuestionsCounts } from 'hooks';
import { withLayout } from 'layouts';
import { Spinner } from 'react-bootstrap';

const Index = () => {
	const { counts, isLoadingCount } = useQuestionsCounts();

	if (isLoadingCount) {
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
			<Categories questionsListsSizes={counts} />
		</>
	);
};

export default withLayout('main', Index);
