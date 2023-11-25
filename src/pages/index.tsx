import { CategoryCards } from '@/components/category-cards/category-cards'
import { withLayout } from '@/layouts'

const MainPage = () => {
  return <CategoryCards />
}

export default withLayout('main', MainPage)
