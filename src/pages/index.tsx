import { CategoryCards } from '@/components/category-cards/category-cards'
import { withLayout } from '@/layouts'

import { SessionAuth } from 'supertokens-auth-react/recipe/session'
import { AccessDeniedScreen } from 'supertokens-auth-react/recipe/session/prebuiltui'
import {
  UserRoleClaim /*PermissionClaim*/,
} from 'supertokens-auth-react/recipe/userroles'

const AdminRoute = (props: React.PropsWithChildren<any>) => {
  console.log(UserRoleClaim.validators)
  return (
    <SessionAuth
      accessDeniedScreen={AccessDeniedScreen}
      overrideGlobalClaimValidators={(globalValidators) => [
        ...globalValidators,
        UserRoleClaim.validators.includes('Admin'),
      ]}
    >
      {props.children}
    </SessionAuth>
  )
}

const MainPage = () => {
  console.log('process.env.AAA', process.env.AAA)

  return <CategoryCards />
}

export default withLayout('main', MainPage)
