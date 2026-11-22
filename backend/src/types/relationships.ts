export type FollowRow = {
  follower_id: number;
  following_id: number;
  created_at: Date;
};

export type CreateFollowInput = Pick<FollowRow, "follower_id" | "following_id">;

export type LikeRow = {
  user_id: number;
  post_id: number;
  created_at: Date;
};

export type CreateLikeInput = Pick<LikeRow, "user_id" | "post_id">;

export type RepostRow = {
  user_id: number;
  post_id: number;
  created_at: Date;
};

export type CreateRepostInput = Pick<RepostRow, "user_id" | "post_id">;
