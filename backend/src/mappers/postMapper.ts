import type { PostFeedRow, PostResponse } from "../types/post";

export function mapResponse(postFeedRow: PostFeedRow[]): PostResponse[] {
  const posts: PostResponse[] = postFeedRow.map((row) => ({
    author: {
      authorId: row.user_id,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      avatarUrl: row.avatar_url,
    },
    post: {
      postId: row.id,
      textContent: row.text_content,
      mediaUrl: row.media_url,
      createdAt: row.created_at,

      engagement: {
        likesCount: row.likes_count,
        repostsCount: row.reposts_count,
        commentsCount: row.comments_count,
        isLiked: row.is_liked,
        isReposted: row.is_reposted,
        isFollowing: row.is_following,
      },
    },
  }));

  return posts;
}
