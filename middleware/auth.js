import { Auth } from 'aws-amplify'

export default async ({ redirect }) => {
  const authInfo = await Auth.currentUserInfo()
  if (!authInfo) { redirect('/signin') }
}
