'use client'

import { User } from '@supabase/supabase-js'
import PageLayout from './PageLayout'

interface ContentWrapperProps {
  user: User
}

export default function ContentWrapper({ user }: ContentWrapperProps) {
  return (
    <div className="content-wrapper">
      <PageLayout user={user} />
    </div>
  )
}