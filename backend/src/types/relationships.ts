export type FollowRow = {
  follower_id: string;
  following_id: string;
  created_at: Date;
};

export type CreateFollowInput = Pick<FollowRow, "follower_id" | "following_id">;

export type LikeRow = {
  user_id: string;
  post_id: string;
  created_at: Date;
};

export type CreateLikeInput = Pick<LikeRow, "user_id" | "post_id">;

export type RepostRow = {
  user_id: string;
  post_id: string;
  created_at: Date;
};

export type CreateRepostInput = Pick<RepostRow, "user_id" | "post_id">;
