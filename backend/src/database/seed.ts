import { pool } from "./database";
import seedData from "./seedData.json";

import type { PoolClient } from "pg";
import type {
  SeedUser,
  SeedPost,
  SeedFollow,
  SeedLike,
  SeedRepost,
  SeedInterest,
  SeedUserInterests,
  SeedPostInterests,
} from "../types/seed.typs";

const usersIds = new Map<number, number>();
const postsIds = new Map<number, number>();
const interestsIds = new Map<number, number>();

usersIds.clear();
postsIds.clear();
interestsIds.clear();

function getMappedId(
  map: Map<number, number>,
  mapName: string,
  seedId: number,
): number {
  const id = map.get(seedId);

  if (id === undefined) {
    throw new Error(
      `No database ID found for seed ID: ${seedId} for map: ${mapName}`,
    );
  }

  return id;
}

const users: SeedUser[] = seedData.users;
const posts: SeedPost[] = seedData.posts;
const follows: SeedFollow[] = seedData.follows;
const likes: SeedLike[] = seedData.likes;
const reposts: SeedRepost[] = seedData.reposts;
const interests: SeedInterest[] = seedData.interests;
const userInterests: SeedUserInterests[] = seedData.user_interests;
const postInterests: SeedPostInterests[] = seedData.post_interests;

async function clearDatabase(client: PoolClient): Promise<void> {
  await client.query(`
    TRUNCATE TABLE
      users,
      posts,
      follows,
      likes,
      reposts,
      interests,
      user_interests,
      post_interests
    RESTART IDENTITY CASCADE;
  `);
  console.log("Database cleared successfully!");
}

async function insertUsers(
  client: PoolClient,
  user: SeedUser,
): Promise<number> {
  const result = await client.query<{ id: number }>(
    `
        INSERT INTO users (username, first_name, last_name, bio, 
        birthdate, avatar_url, banner_url, email, phone_number, password_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
    `,
    [
      user.username,
      user.first_name,
      user.last_name,
      user.bio,
      user.birthdate,
      user.avatar_url,
      user.banner_url,
      user.email,
      user.phone_number,
      user.password_hash,
    ],
  );

  return result.rows[0].id;
}

async function insertFollows(
  client: PoolClient,
  follow: SeedFollow,
): Promise<void> {
  await client.query(
    `
        INSERT INTO follows (follower_id, following_id, created_at)
        VALUES ($1, $2, $3)
    `,
    [
      getMappedId(usersIds, "users", follow.follower_id),
      getMappedId(usersIds, "users", follow.following_id),
      follow.created_at,
    ],
  );
}

async function insertPosts(
  client: PoolClient,
  post: SeedPost,
): Promise<number> {
  const result = await client.query<{ id: number }>(
    `
        INSERT INTO posts (user_id, text_content, media_url, likes_count,
        reposts_count, comments_count, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `,
    [
      getMappedId(usersIds, "users", post.user_id),
      post.text_content,
      post.media_url,
      post.likes_count,
      post.reposts_count,
      post.comments_count,
      post.created_at,
    ],
  );

  return result.rows[0].id;
}

async function insertLikes(client: PoolClient, like: SeedLike): Promise<void> {
  await client.query(
    `
        INSERT INTO likes (user_id, post_id, created_at)
        VALUES ($1, $2, $3)
    `,
    [
      getMappedId(usersIds, "users", like.user_id),
      getMappedId(postsIds, "posts", like.post_id),
      like.created_at,
    ],
  );
}

async function seedReposts(
  client: PoolClient,
  repost: SeedRepost,
): Promise<void> {
  await client.query(
    `
        INSERT INTO reposts (user_id, post_id, created_at)
        VALUES ($1, $2, $3)
    `,
    [
      getMappedId(usersIds, "users", repost.user_id),
      getMappedId(postsIds, "posts", repost.post_id),
      repost.created_at,
    ],
  );
}

async function insertInterests(
  client: PoolClient,
  interest: SeedInterest,
): Promise<number> {
  const result = await client.query<{ id: number }>(
    `
        INSERT INTO interests (name, description, created_at)
        VALUES ($1, $2, $3)
        RETURNING id
    `,
    [interest.name, interest.description, interest.created_at],
  );

  return result.rows[0].id;
}

async function insertUserInterests(
  client: PoolClient,
  userInterest: SeedUserInterests,
): Promise<void> {
  await client.query(
    `
        INSERT INTO user_interests (user_id, interest_id, created_at)
        VALUES ($1, $2, $3)
    `,
    [
      getMappedId(usersIds, "users", userInterest.user_id),
      getMappedId(interestsIds, "intrests", userInterest.interest_id),
      userInterest.created_at,
    ],
  );
}

async function insertPostInterests(
  client: PoolClient,
  postInterest: SeedPostInterests,
): Promise<void> {
  await client.query(
    `
        INSERT INTO post_interests (post_id, interest_id, created_at)
        VALUES ($1, $2, $3)
    `,
    [
      getMappedId(postsIds, "users", postInterest.post_id),
      getMappedId(interestsIds, "intrests", postInterest.interest_id),
      postInterest.created_at,
    ],
  );
}

async function seedDatabase(): Promise<void> {
  const client: PoolClient = await pool.connect();

  try {
    await client.query("BEGIN");

    await clearDatabase(client);

    for (const user of users) {
      const userId = await insertUsers(client, user);
      usersIds.set(user.id, userId);
    }

    for (const follow of follows) {
      await insertFollows(client, follow);
    }

    for (const post of posts) {
      const postId = await insertPosts(client, post);
      postsIds.set(post.id, postId);
    }

    for (const like of likes) {
      await insertLikes(client, like);
    }

    for (const repost of reposts) {
      await seedReposts(client, repost);
    }

    for (const interest of interests) {
      const interestId = await insertInterests(client, interest);
      interestsIds.set(interest.id, interestId);
    }

    for (const userInterest of userInterests) {
      await insertUserInterests(client, userInterest);
    }

    for (const postInterest of postInterests) {
      await insertPostInterests(client, postInterest);
    }

    await client.query("COMMIT");
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Rollback failed:", rollbackError);
    }

    throw error;
  } finally {
    client.release();
  }

  console.log("Database seeded successfully!");
}

async function main(): Promise<void> {
  try {
    await seedDatabase();
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

void main();
