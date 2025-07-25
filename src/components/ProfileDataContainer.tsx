'use client'

import UserProfileProvider from './UserProfileProvider'

interface UserInfo {
  id: string
  email: string | undefined
  displayName: string
  avatar: string | undefined
  fullName: string | undefined
}

interface ProfileDataContainerProps {
  userInfo: UserInfo
  children: React.ReactNode
}

export default function ProfileDataContainer({ userInfo, children }: ProfileDataContainerProps) {
  const profileData = {
    userId: userInfo.id,
    userEmail: userInfo.email,
    userName: userInfo.displayName,
    userAvatar: userInfo.avatar,
    userFullName: userInfo.fullName
  }

  return (
    <div className="profile-data-container">
      <UserProfileProvider profileData={profileData}>
        {children}
      </UserProfileProvider>
    </div>
  )
}