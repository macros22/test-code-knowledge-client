import { Categories } from 'components';
import { useQuestionsInfo } from 'hooks';
import { withLayout } from 'layouts';
import { Spinner } from 'react-bootstrap';

const Index = () => {
	const { questionsInfo, isLoadingQuestionsInfo } = useQuestionsInfo();

	if (isLoadingQuestionsInfo) {
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
			<Categories questionsInfo={questionsInfo} />
		</>
	);
};

export default withLayout('main', Index);
