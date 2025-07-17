import { useState, useEffect } from "react";
import UserInfo from "@/components/molecules/UserInfo";
import PostActions from "@/components/molecules/PostActions";
import CommentSection from "@/components/organisms/CommentSection";
import userService from "@/services/api/userService";
import { cn } from "@/utils/cn";

const PostCard = ({ post, showComments = false, className }) => {
  const [user, setUser] = useState(null);
  const [showAllComments, setShowAllComments] = useState(showComments);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getById(post.userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [post.userId]);

  const handleLike = (postId, isLiked) => {
    // Handle like functionality
    console.log(`${isLiked ? "Liked" : "Unliked"} post ${postId}`);
  };

  const handleComment = (postId) => {
    setShowAllComments(true);
  };

  const handleShare = (postId) => {
    // Handle share functionality
    console.log(`Shared post ${postId}`);
  };

  if (!user) return null;

  return (
    <article className={cn("bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 pb-3">
        <UserInfo 
          user={user} 
          timestamp={post.timestamp}
          showFollowButton
        />
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-100">
        <img 
          src={post.imageUrl} 
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4 pb-3">
        <PostActions
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>

      {/* Likes count */}
      <div className="px-4 pb-2">
        <p className="font-semibold text-gray-900 text-sm">
          {post.likes} likes
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 text-sm">
          <span className="font-semibold mr-2">{user.username}</span>
          {post.caption}
        </p>
      </div>

      {/* Comments */}
      {post.comments?.length > 0 && (
        <div className="px-4 pb-3">
          {!showAllComments ? (
            <button 
              onClick={() => setShowAllComments(true)}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              View all {post.comments.length} comments
            </button>
          ) : (
            <CommentSection postId={post.Id} />
          )}
        </div>
      )}
    </article>
  );
};

export default PostCard;