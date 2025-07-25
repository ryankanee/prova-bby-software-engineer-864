"use client";

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Bookmark, Camera, Heart, User as UserIcon } from "lucide-react";

interface HeaderProps {
  onCreatePost: () => void;
  showBookmarksOnly: boolean;
  onToggleBookmarks: () => void;
  showLikesOnly: boolean;
  onToggleLikes: () => void;
}

export default function Header({
  onCreatePost,
  showBookmarksOnly,
  onToggleBookmarks,
  showLikesOnly,
  onToggleLikes,
}: HeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Instagram</h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCreatePost}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Camera className="w-6 h-6" />
            </button>

            <button
              onClick={onToggleLikes}
              className={`p-2 hover:bg-gray-100 rounded-full ${showLikesOnly ? "bg-red-100" : ""}`}
            >
              <Heart
                className={`w-6 h-6 ${showLikesOnly ? "text-red-600 fill-current" : ""}`}
              />
            </button>

            <button
              onClick={onToggleBookmarks}
              className={`p-2 hover:bg-gray-100 rounded-full ${showBookmarksOnly ? "bg-yellow-100" : ""}`}
            >
              <Bookmark
                className={`w-6 h-6 ${showBookmarksOnly ? "text-yellow-600 fill-current" : ""}`}
              />
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <UserIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
