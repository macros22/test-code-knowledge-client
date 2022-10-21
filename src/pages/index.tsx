// import { Categories } from 'components';
import Categories from 'components/Categories/Categories';
import { withLayout } from 'layouts';

const IndexPage = () => {

	return (

		<Categories />

	);
};

export default withLayout('main', IndexPage);
