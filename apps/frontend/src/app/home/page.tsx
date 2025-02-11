import HomeComponent from '@/components/home/HomeComponent'
import { fetchUserAction } from './utils/fetchUserAction'

export const dynamic = 'force-dynamic'

async function HomePage() {
  const allUsers = await fetchUserAction()

  return <HomeComponent allUsers={allUsers.data} />
}

export default HomePage
