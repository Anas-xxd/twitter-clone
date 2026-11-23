export type InterestRow = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type CreateInterestInput = Pick<InterestRow, "name" | "description">;

export type UpdateInterestInput = Pick<InterestRow, "description">;

export type UserInterestRow = {
  user_id: string;
  interest_id: string;
  created_at: Date;
};

export type CreateUserInterestInput = Pick<
  UserInterestRow,
  "user_id" | "interest_id"
>;

export type PostInterestRow = {
  post_id: string;
  interest_id: string;
  created_at: Date;
};

export type CreatePostInterestInput = Pick<
  PostInterestRow,
  "post_id" | "interest_id"
>;
