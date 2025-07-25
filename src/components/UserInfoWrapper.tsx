'use client'

import ProfileDataContainer from './ProfileDataContainer'

interface UserInfo {
  id: string
  email: string | undefined
  displayName: string
  avatar: string | undefined
  fullName: string | undefined
}

interface UserInfoWrapperProps {
  userInfo: UserInfo
  children: React.ReactNode
}

export default function UserInfoWrapper({ userInfo, children }: UserInfoWrapperProps) {
  return (
    <div className="user-info-wrapper">
      <ProfileDataContainer userInfo={userInfo}>
        {children}
      </ProfileDataContainer>
    </div>
  )
}