# Take-Home Project: Instagram Clone Enhancement

## Project Background
You've been given a working Instagram clone built with Next.js, TypeScript, and Supabase. The app has basic functionality including authentication, posting, likes, and comments. However, the codebase has some architectural problems that need to be addressed.

## Current Issues You May Encounter
The codebase has some architectural challenges that you may need to address to complete the task effectively. Feel free to refactor or improve the code structure as needed.

## Your Tasks

### Task 1: Fix the Post Modal Issue
There's currently an issue with the post creation modal. When users try to create a new post, the modal may not be working properly. You need to:

1. **Identify the problem** - Debug why the post modal isn't functioning correctly
2. **Fix the issue** - Implement the proper solution
3. **Test the functionality** - Ensure users can successfully create posts

### Task 2: Add User Avatar to Header
The header component currently doesn't display the user's avatar. We need you to:

1. **Add user avatar to the header** - Display the user's profile picture in the header
2. **Implement proper fallback** - Show user initials or default avatar when no image is available
3. **Make it clickable** - Avatar should link to the user's profile page
4. **Ensure responsive design** - Avatar should work well on mobile and desktop

### Task 3: Add Bookmark Feature to Posts
Implement a bookmark feature that allows users to save posts for later viewing:

1. **Database Design** - Determine where to store bookmark data
2. **Database Migration** - Create a separate SQL file (`bookmark_migration.sql`) with the necessary database changes
3. **Backend Integration** - Update the database schema and policies
4. **Frontend Implementation** - Add bookmark/unbookmark functionality to posts
5. **UI Components** - Add bookmark icon to post cards and create a bookmarks view
6. **User Experience** - Ensure bookmarks are easily accessible and manageable

#### Bookmark Feature Requirements:
- Users should be able to bookmark/unbookmark posts
- Bookmark status should be visible on post cards
- Create a way for users to view their bookmarked posts
- Ensure proper database relationships and constraints
- Implement appropriate Row Level Security (RLS) policies

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account

### Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the `database.sql` script in your Supabase SQL editor
   - Create an `images` storage bucket with public access
   - Update `.env.local` with your Supabase credentials
4. Run the development server: `npm run dev`

### Environment Variables
Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Good luck! 🚀