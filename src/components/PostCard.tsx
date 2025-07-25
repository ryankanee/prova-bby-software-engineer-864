"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";
import Image from "next/image";

interface Post {
  id: string;
  user_id: string;
  caption: string;
  image_url: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  likes: { id: string; user_id: string }[];
  bookmarks?: { id: string; user_id: string }[];
  comments: {
    id: string;
    content: string;
    user_id: string;
    profiles: { username: string };
  }[];
}

interface PostCardProps {
  post: Post;
  currentUser: User;
  onUpdate: () => void;
}

export default function PostCard({
  post,
  currentUser,
  onUpdate,
}: PostCardProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLiked = post.likes.some((like) => like.user_id === currentUser.id);
  const isBookmarked =
    post.bookmarks?.some((bookmark) => bookmark.user_id === currentUser.id) ||
    false;
  const likesCount = post.likes.length;

  const handleLike = async () => {
    try {
      if (isLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", currentUser.id)
          .eq("post_id", post.id);
      } else {
        await supabase.from("likes").insert({
          user_id: currentUser.id,
          post_id: post.id,
        });
      }
      onUpdate();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", currentUser.id)
          .eq("post_id", post.id);
      } else {
        await supabase.from("bookmarks").insert({
          user_id: currentUser.id,
          post_id: post.id,
        });
      }
      onUpdate();
    } catch (error) {
      console.error("Error toggling bookmark: ", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await supabase.from("comments").insert({
        user_id: currentUser.id,
        post_id: post.id,
        content: comment.trim(),
      });

      setComment("");
      onUpdate();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          {post.profiles.avatar_url ? (
            <Image
              src={post.profiles.avatar_url}
              alt={post.profiles.username}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <span className="text-sm font-medium">
              {post.profiles.username[0].toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">{post.profiles.username}</p>
          <p className="text-sm text-gray-500">
            {formatTimeAgo(post.created_at)}
          </p>
        </div>
        <button
          onClick={handleBookmark}
          className={`p-1 ml-auto ${isBookmarked ? "text-yellow-500" : "text-gray-600"}`}
        >
          <Bookmark
            className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`}
          />
        </button>
      </div>

      <div className="aspect-square relative">
        <Image src={post.image_url} alt="Post" fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`p-1 ${isLiked ? "text-red-500" : "text-gray-600"}`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button className="p-1 text-gray-600">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="p-1 text-gray-600">
              <Share className="w-6 h-6" />
            </button>
          </div>
        </div>

        {likesCount > 0 && (
          <p className="font-medium text-sm mb-1 text-gray-800">
            {likesCount} {likesCount === 1 ? "like" : "likes"}
          </p>
        )}

        {post.caption && (
          <p className="text-sm mb-2 text-gray-800">
            <span className="font-medium text-gray-900 mr-2">
              {post.profiles.username}
            </span>
            {post.caption}
          </p>
        )}

        {post.comments.length > 0 && (
          <div className="space-y-1 mb-2">
            {post.comments.map((comment) => (
              <p key={comment.id} className="text-sm text-gray-800">
                <span className="font-medium text-gray-900 mr-2">
                  {comment.profiles.username}
                </span>
                {comment.content}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleComment} className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 text-sm text-gray-900 outline-none placeholder:text-gray-600"
            disabled={isSubmitting}
          />
          {comment.trim() && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-blue-500 text-sm font-medium ml-2"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
