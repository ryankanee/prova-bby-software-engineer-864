'use client'

import { User } from '@supabase/supabase-js'
import UserDataProcessor from './UserDataProcessor'

interface UserDataProviderProps {
  user: User
  children: React.ReactNode
}

export default function UserDataProvider({ user, children }: UserDataProviderProps) {
  return (
    <div className="user-data-provider">
      <UserDataProcessor user={user}>
        {children}
      </UserDataProcessor>
    </div>
  )
}