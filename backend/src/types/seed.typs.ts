export type SeedUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  birthdate: string;
  avatar_url: string | null;
  banner_url: string | null;
  email: string;
  phone_number: string;
  password_hash: string;
};

export type SeedPost = {
  id: number;
  user_id: number;
  text_content: string;
  media_url: string | null;
  created_at: string;
  likes_count: number;
  reposts_count: number;
  comments_count: number;
};

export type SeedFollow = {
  follower_id: number;
  following_id: number;
  created_at: string;
};

export type SeedLike = {
  user_id: number;
  post_id: number;
  created_at: string;
};

export type SeedRepost = {
  user_id: number;
  post_id: number;
  created_at: string;
};

export type SeedInterest = {
  id: number;
  name: string;
  description: string;
  created_at: string;
};

export type SeedUserInterests = {
  user_id: number;
  interest_id: number;
  created_at: string;
};

export type SeedPostInterests = {
  post_id: number;
  interest_id: number;
  created_at: string;
};
