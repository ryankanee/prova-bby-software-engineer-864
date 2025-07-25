'use client'

import { User } from '@supabase/supabase-js'
import UserDataHandler from './UserDataHandler'

interface UserDataProcessorProps {
  user: User
  children: React.ReactNode
}

export default function UserDataProcessor({ user, children }: UserDataProcessorProps) {
  const processedUser = {
    ...user,
    displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  }

  return (
    <div className="user-data-processor">
      <UserDataHandler user={processedUser}>
        {children}
      </UserDataHandler>
    </div>
  )
}