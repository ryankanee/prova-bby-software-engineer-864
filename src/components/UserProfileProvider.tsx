'use client'

interface ProfileData {
  userId: string
  userEmail: string | undefined
  userName: string
  userAvatar: string | undefined
  userFullName: string | undefined
}

interface UserProfileProviderProps {
  profileData: ProfileData
  children: React.ReactNode
}

export default function UserProfileProvider({ profileData, children }: UserProfileProviderProps) {
  return (
    <div className="user-profile-provider" data-user-id={profileData.userId}>
      {children}
    </div>
  )
}