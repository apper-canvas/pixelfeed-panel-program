import { useState, useEffect } from "react";
import PostCard from "@/components/organisms/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postService from "@/services/api/postService";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await postService.getAll();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleRetry = () => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await postService.getAll();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={handleRetry} />;
  if (posts.length === 0) return <Empty message="No posts in your feed" action="Create your first post" />;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.Id} post={post} />
      ))}
    </div>
  );
};

export default Home;