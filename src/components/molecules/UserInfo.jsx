import Avatar from "@/components/atoms/Avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/utils/cn";

const UserInfo = ({ 
  user, 
  timestamp, 
  showFollowButton = false, 
  className 
}) => {
  const timeAgo = timestamp ? formatDistanceToNow(new Date(timestamp), { addSuffix: true }) : null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar 
        src={user.avatar} 
        alt={user.username}
        size="default"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 text-sm">
            {user.username}
          </h3>
          {timeAgo && (
            <span className="text-gray-500 text-xs">
              • {timeAgo}
            </span>
          )}
        </div>
        {user.bio && (
          <p className="text-gray-600 text-xs mt-0.5 line-clamp-1">
            {user.bio}
          </p>
        )}
      </div>
      {showFollowButton && (
        <button className="text-primary font-semibold text-sm hover:text-secondary transition-colors">
          Follow
        </button>
      )}
    </div>
  );
};

export default UserInfo;