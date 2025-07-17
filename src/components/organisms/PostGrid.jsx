import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postService from "@/services/api/postService";
import { cn } from "@/utils/cn";

const PostGrid = ({ posts: propPosts, userId, className }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (propPosts) {
      setPosts(propPosts);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = userId 
          ? await postService.getByUserId(userId)
          : await postService.getAll();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [propPosts, userId]);

  const handleRetry = () => {
    // Trigger refetch
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = userId 
          ? await postService.getByUserId(userId)
          : await postService.getAll();
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
  if (posts.length === 0) return <Empty message="No posts yet" action="Share your first photo!" />;

  return (
    <div className={cn("grid grid-cols-3 gap-1 sm:gap-2", className)}>
      {posts.map((post) => (
        <Link 
          key={post.Id} 
          to={`/post/${post.Id}`}
          className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
        >
          <img 
            src={post.imageUrl} 
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default PostGrid;