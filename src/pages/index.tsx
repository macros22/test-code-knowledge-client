import { Categories } from '@/components/categories/categories'
import { withLayout } from '@/layouts'

const MainPage = () => {
  return <Categories />
}

export default withLayout('main', MainPage)
