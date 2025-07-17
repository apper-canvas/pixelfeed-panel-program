import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "@/components/organisms/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postService from "@/services/api/postService";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      try {
        const postData = await postService.getById(id);
        if (!postData) {
          setError("Post not found");
          return;
        }
        setPost(postData);
      } catch (err) {
        setError("Failed to load post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleRetry = () => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      try {
        const postData = await postService.getById(id);
        if (!postData) {
          setError("Post not found");
          return;
        }
        setPost(postData);
      } catch (err) {
        setError("Failed to load post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={handleRetry} />;
  if (!post) return <Empty message="Post not found" action="Go back" actionTo="/" />;

  return (
    <div>
      <PostCard post={post} showComments={true} />
    </div>
  );
};

export default PostDetail;