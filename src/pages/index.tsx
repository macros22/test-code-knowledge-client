import { TechnologyList } from 'components';
import { withLayout } from 'layouts/MainLayout';

const Home = () => {
	return (
		<div>
			<TechnologyList />
		</div>
	);
};

export default withLayout(Home);
