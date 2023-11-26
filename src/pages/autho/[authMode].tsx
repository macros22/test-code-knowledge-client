import { GetServerSideProps, NextPage } from 'next'
import { AuthForm } from '@/components/auth-form'
import { withLayout } from '@/layouts'
import { AuthPageProps } from '@/lib/interfaces/user.interface'

export const getServerSideProps: GetServerSideProps<AuthPageProps> = async (
  context,
) => {
  const authMode =
    context.query['authMode'] === 'sign-up' ? 'sign-up' : 'sign-in'
  return { props: { authMode } }
}

const AuthPage: NextPage<AuthPageProps> = ({ authMode }) => {
  return <AuthForm authMode={authMode} />
}

export default withLayout('auth', AuthPage)
