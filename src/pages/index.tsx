import { Categories } from '@/components/categories/cat'
import { withLayout } from '@/layouts'

const MainPage = () => {
  return <Categories />
}

export default withLayout('main', MainPage)
