import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import postService from "@/services/api/postService";
import userService from "@/services/api/userService";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !caption.trim()) {
      toast.error("Please select an image and add a caption");
      return;
    }

    setLoading(true);
    try {
      const currentUser = await userService.getCurrentUser();
      
      // Extract hashtags from caption
      const hashtags = caption.match(/#\w+/g) || [];
      const cleanHashtags = hashtags.map(tag => tag.slice(1));
      
      const postData = {
        userId: currentUser.Id.toString(),
        imageUrl: imagePreview, // In a real app, this would be uploaded to a server
        caption: caption.trim(),
        hashtags: cleanHashtags
      };

      await postService.create(postData);
      toast.success("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Post</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-4">
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                <ApperIcon name="ImageIcon" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Select a photo to share</p>
                <Button
                  type="button"
                  variant="gradient"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <Button
                  type="button"
                  variant="danger"
                  size="icon"
                  onClick={handleClearImage}
                  className="absolute top-2 right-2"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Caption */}
          <FormField
            label="Caption"
            multiline
            rows={4}
            placeholder="Write a caption... Use #hashtags to reach more people"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              disabled={!selectedImage || !caption.trim() || loading}
              className="flex-1"
            >
              {loading ? "Posting..." : "Share Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;