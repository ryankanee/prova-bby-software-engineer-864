'use client'

import { User } from '@supabase/supabase-js'
import UserInfoWrapper from './UserInfoWrapper'

interface UserDataHandlerProps {
  user: User & { displayName: string }
  children: React.ReactNode
}

export default function UserDataHandler({ user, children }: UserDataHandlerProps) {
  const userInfo = {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    avatar: user.user_metadata?.avatar_url,
    fullName: user.user_metadata?.full_name
  }

  return (
    <div className="user-data-handler">
      <UserInfoWrapper userInfo={userInfo}>
        {children}
      </UserInfoWrapper>
    </div>
  )
}