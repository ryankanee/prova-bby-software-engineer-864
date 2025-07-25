'use client'

import { User } from '@supabase/supabase-js'
import UserDataProvider from './UserDataProvider'
import MainContainer from './MainContainer'

interface AppWrapperProps {
  user: User
}

export default function AppWrapper({ user }: AppWrapperProps) {
  return (
    <div className="app-wrapper">
      <UserDataProvider user={user}>
        <MainContainer user={user} />
      </UserDataProvider>
    </div>
  )
}