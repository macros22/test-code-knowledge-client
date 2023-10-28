import { Categories } from 'components/Categories/Categories';
import { withLayout } from 'layouts';

const IndexPage = () => {
  return (
    <Categories />
    // <div></div>
  );
};

export default withLayout('main', IndexPage);
