export type UserRow = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio: string | null;
  birthdate: string;
  avatar_url: string | null;
  banner_url: string | null;
  followers_count: string;
  following_count: string;
  email: string;
  email_verified_at: Date | null;
  phone_number: string | null;
  phone_number_verified_at: Date | null;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type CreateUserInput = Pick<
  UserRow,
  | "username"
  | "first_name"
  | "last_name"
  | "birthdate"
  | "email"
  | "phone_number"
> & {
  password: string;
};

export type UpdateUserInput = Partial<
  Pick<
    UserRow,
    | "username"
    | "first_name"
    | "last_name"
    | "bio"
    | "birthdate"
    | "avatar_url"
    | "banner_url"
    | "email"
    | "phone_number"
  >
>;

export type UserPublicResponse = Pick<
  UserRow,
  | "username"
  | "first_name"
  | "last_name"
  | "bio"
  | "birthdate"
  | "avatar_url"
  | "banner_url"
  | "followers_count"
  | "following_count"
  | "created_at"
>;

export type UserResponse = Omit<UserRow, "password_hash">;
