"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Feed from "./Feed";

interface FeedContainerProps {
  user: User;
}

export default function FeedContainer({ user }: FeedContainerProps) {
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [showLikesOnly, setShowLikesOnly] = useState(false);

  const handleToggleBookmarks = () => {
    setShowBookmarksOnly(!showBookmarksOnly);
    if (!showBookmarksOnly) {
      setShowLikesOnly(false);
    }
  };

  const handleToggleLikes = () => {
    setShowLikesOnly(!showLikesOnly);
    if (!showLikesOnly) {
      setShowBookmarksOnly(false);
    }
  };

  return (
    <div className="feed-container">
      <Feed
        user={user}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarks={handleToggleBookmarks}
        showLikesOnly={showLikesOnly}
        onToggleLikes={handleToggleLikes}
      />
    </div>
  );
}
