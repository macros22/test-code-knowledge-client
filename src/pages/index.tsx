import { Categories } from 'components';
import { useQuestionsInfo } from 'hooks';
import { withLayout } from 'layouts';
import { Spinner } from 'react-bootstrap';

const Index = () => {

	return (
		<>
			<Categories  />
		</>
	);
};

export default withLayout('main', Index);
