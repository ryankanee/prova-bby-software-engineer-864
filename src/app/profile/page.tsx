'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Camera, Edit2, Grid, Heart, MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface Profile {
  id: string
  username: string
  full_name: string
  bio: string
  avatar_url: string
  website: string
}

interface Post {
  id: string
  image_url: string
  caption: string
  created_at: string
  likes: { id: string }[]
  comments: { id: string }[]
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: '',
    full_name: '',
    bio: '',
    website: ''
  })
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
        await fetchPosts(session.user.id)
      } else {
        router.push('/auth')
      }
      setLoading(false)
    }

    checkUser()
  }, [router])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
      setEditForm({
        username: data.username || '',
        full_name: data.full_name || '',
        bio: data.bio || '',
        website: data.website || ''
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const fetchPosts = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          likes (id),
          comments (id)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: editForm.username,
          full_name: editForm.full_name,
          bio: editForm.bio,
          website: editForm.website
        })
        .eq('id', user.id)

      if (error) throw error
      
      await fetchProfile(user.id)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-lg font-semibold"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold">{profile.username}</h1>
            <button
              onClick={handleSignOut}
              className="text-sm text-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.username}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-gray-500" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile.username}</h2>
                <p className="text-gray-600">{profile.full_name}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </button>
          </div>

          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-xl font-semibold">{posts.length}</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">0</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold">0</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>

          {profile.bio && (
            <p className="text-sm mb-2">{profile.bio}</p>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              {profile.website}
            </a>
          )}
        </div>

        <div className="border-t">
          <div className="flex items-center justify-center py-3">
            <Grid className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">POSTS</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square relative group">
              <Image
                src={post.image_url}
                alt="Post"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-1" />
                    <span>{post.likes.length}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-1" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Camera className="w-12 h-12 mx-auto mb-2" />
            <p>No posts yet</p>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
            </div>
            <form onSubmit={handleUpdateProfile} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}