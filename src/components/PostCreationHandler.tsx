'use client'

import { User } from '@supabase/supabase-js'
import CreatePostContainer from './CreatePostContainer'

interface PostCreationHandlerProps {
  user: User
  showCreatePost: boolean
  onClose: () => void
  onPostCreated: () => void
}

export default function PostCreationHandler({ 
  user, 
  showCreatePost, 
  onClose, 
  onPostCreated 
}: PostCreationHandlerProps) {
  if (!showCreatePost) return null

  return (
    <div className="post-creation-handler">
      <CreatePostContainer
        user={user}
        onClose={onClose}
        onPostCreated={onPostCreated}
      />
    </div>
  )
}