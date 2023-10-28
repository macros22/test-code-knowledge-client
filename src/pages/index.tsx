import { Categories } from 'components/Categories/Categories';
import { withLayout } from 'layouts';

const HomePage = () => {
  return <Categories />;
};

export default withLayout('main', HomePage);
