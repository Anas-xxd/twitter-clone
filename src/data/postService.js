export default async function getPosts() {
  try {
    const response = await fetch("/data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
