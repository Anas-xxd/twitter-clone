export type PostRow = {
  id: number;
  user_id: number;
  text_content: string;
  media_url: string | null;
  likes_count: number;
  reposts_count: number;
  comments_count: number;
  parent_post_id: number | null;
  created_at: Date;
  updated_at: Date;
};

export type CreatePostInput = Pick<
  PostRow,
  "text_content" | "media_url" | "parent_post_id"
>;

export type UpdataPostInput = Partial<
  Pick<PostRow, "text_content" | "media_url">
>;

export type PostResponse = PostRow & {
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  banner_url: string | null;
};
