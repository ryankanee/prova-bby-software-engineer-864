'use client'

import { User } from '@supabase/supabase-js'
import FeedContainer from './FeedContainer'

interface PageLayoutProps {
  user: User
}

export default function PageLayout({ user }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <FeedContainer user={user} />
    </div>
  )
}