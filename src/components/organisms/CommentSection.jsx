import { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import commentService from "@/services/api/commentService";
import userService from "@/services/api/userService";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await commentService.getByPostId(postId);
        const commentsWithUsers = await Promise.all(
          commentsData.map(async (comment) => {
            const user = await userService.getById(comment.userId);
            return { ...comment, user };
          })
        );
        setComments(commentsWithUsers);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchComments();
    fetchCurrentUser();
  }, [postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const commentData = {
        postId,
        userId: currentUser.Id.toString(),
        text: newComment.trim(),
        parentId: null
      };

      const createdComment = await commentService.create(commentData);
      const commentWithUser = { ...createdComment, user: currentUser };
      
      setComments(prev => [...prev, commentWithUser]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.Id} className="flex gap-3">
            <Avatar 
              src={comment.user?.avatar} 
              alt={comment.user?.username}
              size="sm"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900">
                  {comment.user?.username}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      {currentUser && (
        <form onSubmit={handleSubmitComment} className="flex gap-3">
          <Avatar 
            src={currentUser.avatar} 
            alt={currentUser.username}
            size="sm"
          />
          <div className="flex-1">
            <FormField
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!newComment.trim() || loading}
              className="ml-auto"
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;