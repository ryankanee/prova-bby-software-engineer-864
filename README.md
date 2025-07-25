# Instagram Clone

A full-featured Instagram clone built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Authentication**: Sign up, sign in, and sign out functionality
- **User Profiles**: View and edit user profiles with bio, website, and avatar
- **Posts**: Create posts with images and captions
- **Feed**: Home feed displaying posts from all users
- **Interactions**: Like/unlike posts and add comments
- **Follow System**: Follow/unfollow other users (component ready)
- **Real-time Updates**: Real-time updates using Supabase
- **Responsive Design**: Mobile-first responsive design

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- Git

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd instagram-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to Settings > API to get your project URL and anon key
4. Create a new storage bucket called `images` with public access

### 4. Set up the database

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database.sql` into the editor
4. Run the SQL to create all tables, policies, and functions

### 5. Set up storage

1. In your Supabase dashboard, click on Storage in the left sidebar
2. Click Create a new bucket
3. Name the bucket: images
4. Make sure Public bucket is checked (this allows public access to uploaded images)
5. Click Create bucket


### 5. Configure environment variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase project URL and anon key.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   └── page.tsx          # Authentication page
│   ├── profile/
│   │   └── page.tsx          # User profile page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (feed)
├── components/
│   ├── CreatePost.tsx        # Post creation modal
│   ├── Feed.tsx              # Main feed component
│   ├── FollowButton.tsx      # Follow/unfollow button
│   ├── Header.tsx            # App header
│   └── PostCard.tsx          # Individual post component
└── lib/
    └── supabase.ts           # Supabase client configuration
```

## Database Schema

The app uses the following main tables:

- `profiles`: User profile information
- `posts`: User posts with images and captions
- `likes`: Post likes
- `comments`: Post comments
- `follows`: User follow relationships

## Features in Detail

### Authentication
- Email/password authentication
- Automatic profile creation on signup
- Session management

### Posts
- Image upload to Supabase storage
- Caption support
- Real-time like counts
- Comment system

### User Profiles
- Profile editing (username, bio, website)
- Post grid view
- Follow/follower counts (ready for implementation)

### Feed
- Chronological post display
- Like/unlike functionality
- Add comments
- Real-time updates

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to add these environment variables in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes. Feel free to use it as a learning resource.

## Next Steps

To further enhance the app, consider adding:

- Direct messaging
- Stories feature
- Search functionality
- Notifications
- Image filters
- Video posts
- Hashtag support
- Explore page

## Support

If you encounter any issues during setup, please check:

1. Your Supabase project is active
2. Environment variables are correctly set
3. Database tables were created successfully
4. Storage bucket is configured with public access

For more help, refer to the [Supabase documentation](https://supabase.com/docs) and [Next.js documentation](https://nextjs.org/docs).
