import { Categories } from '@/components/cat/cat'
import { withLayout } from '@/layouts'

const MainPage = () => {
  return <Categories />
}

export default withLayout('main', MainPage)
