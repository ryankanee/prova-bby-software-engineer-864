'use client'

import { User } from '@supabase/supabase-js'
import ContentWrapper from './ContentWrapper'

interface MainContainerProps {
  user: User
}

export default function MainContainer({ user }: MainContainerProps) {
  return (
    <div className="main-container">
      <ContentWrapper user={user} />
    </div>
  )
}