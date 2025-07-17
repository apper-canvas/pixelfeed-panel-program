import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const PostActions = ({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  isLiked = false, 
  className 
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike && onLike(post.Id, !liked);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLike}
        className={cn(
          "hover:scale-110 transition-transform",
          liked && "text-red-500"
        )}
      >
        <ApperIcon 
          name={liked ? "Heart" : "Heart"} 
          className={cn(
            "w-6 h-6",
            liked && "fill-current heart-animation"
          )}
        />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onComment && onComment(post.Id)}
        className="hover:scale-110 transition-transform"
      >
        <ApperIcon name="MessageCircle" className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onShare && onShare(post.Id)}
        className="hover:scale-110 transition-transform"
      >
        <ApperIcon name="Share" className="w-6 h-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto hover:scale-110 transition-transform"
      >
        <ApperIcon name="Bookmark" className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default PostActions;