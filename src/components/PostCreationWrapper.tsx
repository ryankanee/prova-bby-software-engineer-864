'use client'

import { User } from '@supabase/supabase-js'
import PostCreationHandler from './PostCreationHandler'

interface PostCreationWrapperProps {
  user: User
  showCreatePost: boolean
  onClose: () => void
  onPostCreated: () => void
}

export default function PostCreationWrapper({ 
  user, 
  showCreatePost, 
  onClose, 
  onPostCreated 
}: PostCreationWrapperProps) {
  return (
    <div className="post-creation-wrapper">
      <PostCreationHandler
        user={user}
        showCreatePost={showCreatePost}
        onClose={onClose}
        onPostCreated={onPostCreated}
      />
    </div>
  )
}