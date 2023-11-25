import { Categories } from '@/components/categories/categories'
import { withLayout } from '@/layouts'

const CategoriesPage = () => {
  return <Categories />
}

export default withLayout('main', CategoriesPage)
