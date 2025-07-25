'use client'

import { User } from '@supabase/supabase-js'
import CreatePost from './CreatePost'

interface CreatePostContainerProps {
  user: User
  onClose: () => void
  onPostCreated: () => void
}

export default function CreatePostContainer({ 
  user, 
  onClose, 
  onPostCreated 
}: CreatePostContainerProps) {
  return (
    <div className="create-post-container">
      <CreatePost
        user={user}
        onClose={onClose}
        onPostCreated={onPostCreated}
      />
    </div>
  )
}