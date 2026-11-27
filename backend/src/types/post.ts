export type PostRow = {
  id: string;
  user_id: string;
  text_content: string;
  media_url: string | null;
  likes_count: number;
  reposts_count: number;
  comments_count: number;
  parent_post_id: string | null;
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

export type PostFeedRow = {
  id: string;
  user_id: string;
  text_content: string;
  media_url: string | null;
  likes_count: number;
  reposts_count: number;
  comments_count: number;
  created_at: Date;

  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;

  is_liked: boolean;
  is_reposted: boolean;
  is_following: boolean;
};

export type PostResponse = {
  author: {
    authorId: string;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  post: {
    postId: string;
    textContent: string;
    mediaUrl: string | null;
    createdAt: Date;

    engagement: {
      likesCount: number;
      repostsCount: number;
      commentsCount: number;
      isLiked: boolean;
      isReposted: boolean;
      isFollowing: boolean;
    };
  };
};
