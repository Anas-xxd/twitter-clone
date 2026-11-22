BEGIN;

-- -----------------------------
-- 1. TABLES
-- -----------------------------
CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    bio VARCHAR(160) DEFAULT NULL,
    birthdate DATE DEFAULT NULL,
    avatar_url VARCHAR(2083) DEFAULT NULL,
    banner_url VARCHAR(2083) DEFAULT NULL,
    email VARCHAR(254) NOT NULL,
    email_verified_at TIMESTAMPTZ DEFAULT NULL,
    phone_number VARCHAR(16) NOT NULL UNIQUE,
    phone_number_verified_at TIMESTAMPTZ DEFAULT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL,

    CHECK (email_verified_at IS NULL OR email_verified_at >= created_at),
    CHECK (phone_number_verified_at IS NULL OR phone_number_verified_at >= created_at),
    CHECK (username ~ '^[A-Za-z0-9_]{3,50}$'),
    CHECK (CHAR_LENGTH(BTRIM(first_name)) BETWEEN 1 AND 50),
    CHECK (CHAR_LENGTH(BTRIM(last_name)) BETWEEN 1 AND 50),
    CHECK (phone_number ~ '^\+[1-9][0-9]{1,14}$')
);

CREATE TABLE IF NOT EXISTS posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text_content VARCHAR(280) NOT NULL,
    media_url VARCHAR(2083) DEFAULT NULL,
    likes_count INT NOT NULL DEFAULT 0,
    reposts_count INT NOT NULL DEFAULT 0,
    comments_count INT NOT NULL DEFAULT 0,
    parent_post_id BIGINT DEFAULT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CHECK (CHAR_LENGTH(BTRIM(text_content)) > 0 AND CHAR_LENGTH(text_content) <= 280),
    CHECK (parent_post_id IS NULL OR parent_post_id <> id),
    CHECK (comments_count >= 0),
    CHECK (likes_count >= 0),
    CHECK (reposts_count >= 0)
);

CREATE TABLE IF NOT EXISTS follows (
    follower_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    CHECK (follower_id <> following_id)
);

CREATE TABLE IF NOT EXISTS likes (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS reposts (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS interests (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CHECK (CHAR_LENGTH(BTRIM(name)) BETWEEN 1 AND 50)
);

CREATE TABLE IF NOT EXISTS user_interests (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    interest_id BIGINT NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, interest_id)
);

CREATE TABLE IF NOT EXISTS post_interests (
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    interest_id BIGINT NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, interest_id)
);

-- -----------------------------
-- 2. INDEXES
-- -----------------------------
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_unique ON users(LOWER(username));
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_posts_parent_post_id ON posts(parent_post_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_reposts_post_id ON reposts(post_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_interests_name_unique ON interests(LOWER(name));
CREATE INDEX IF NOT EXISTS idx_user_interests_interest_id ON user_interests(interest_id);
CREATE INDEX IF NOT EXISTS idx_post_interests_interest_id ON post_interests(interest_id);

-- -----------------------------
-- 3. TRIGGERS
-- -----------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON users;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS posts_updated_at ON posts;

CREATE TRIGGER posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS interests_updated_at ON interests;

CREATE TRIGGER interests_updated_at
BEFORE UPDATE ON interests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

COMMIT;