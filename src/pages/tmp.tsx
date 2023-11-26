import { SessionAuth } from 'supertokens-auth-react/recipe/session'

export default function TmpPage() {
  return (
    <SessionAuth>
      <div>protected</div>
    </SessionAuth>
  )
}