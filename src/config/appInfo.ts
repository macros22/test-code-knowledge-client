import { isDev } from '@/lib/config'
import { prodURL } from '@/lib/constants/urls'

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: isDev ? 'test-code-knowledge-dev' : 'test-code-knowledge-prod',
  apiDomain: isDev ? 'http://localhost:3010' : prodURL,
  websiteDomain: isDev
    ? 'http://localhost:3000'
    : 'https://codeteko.vercel.app',
  apiBasePath: '/api/auth',
  websiteBasePath: '/auth',
}
