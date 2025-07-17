import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import PostGrid from "@/components/organisms/PostGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import userService from "@/services/api/userService";
import postService from "@/services/api/postService";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError("");
      try {
        let userData;
        if (username) {
          userData = await userService.getByUsername(username);
        } else {
          userData = await userService.getCurrentUser();
        }
        
        if (!userData) {
          setError("User not found");
          return;
        }
        
        setUser(userData);
        
        const userPosts = await postService.getByUserId(userData.Id.toString());
        setPosts(userPosts);
      } catch (err) {
        setError("Failed to load profile");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleRetry = () => {
    const fetchUserData = async () => {
      setLoading(true);
      setError("");
      try {
        let userData;
        if (username) {
          userData = await userService.getByUsername(username);
        } else {
          userData = await userService.getCurrentUser();
        }
        
        if (!userData) {
          setError("User not found");
          return;
        }
        
        setUser(userData);
        
        const userPosts = await postService.getByUserId(userData.Id.toString());
        setPosts(userPosts);
      } catch (err) {
        setError("Failed to load profile");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={handleRetry} />;
  if (!user) return <Empty message="User not found" action="Go back" actionTo="/" />;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-6">
          <Avatar 
            src={user.avatar} 
            alt={user.username}
            size="xxl"
            className="ring-4 ring-gradient-to-r from-primary to-secondary"
          />
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              {user.username}
            </h1>
            
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg gradient-text">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg gradient-text">1.2K</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg gradient-text">892</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>
            
            {!username && (
              <Button variant="gradient" size="sm" className="w-full">
                Edit Profile
              </Button>
            )}
            
            {username && (
              <div className="flex gap-2">
                <Button variant="gradient" size="sm" className="flex-1">
                  Follow
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  Message
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {user.bio && (
          <p className="text-gray-700 mt-4 text-sm leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>

      {/* Posts Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts</h3>
        {posts.length === 0 ? (
          <Empty 
            message="No posts yet" 
            action="Create your first post"
            actionTo="/create"
            icon="ImageIcon"
          />
        ) : (
          <PostGrid posts={posts} />
        )}
      </div>
    </div>
  );
};

export default Profile;