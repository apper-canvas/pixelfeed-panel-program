import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";

const Empty = ({ 
  message = "No content yet", 
  action = "Get started",
  actionTo = "/create",
  icon = "ImageIcon"
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate(actionTo);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {message}
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-sm">
        Start sharing your moments with the world. Upload your first photo and connect with others.
      </p>
      
      <Button 
        onClick={handleAction}
        variant="gradient"
        className="flex items-center gap-2"
      >
        <ApperIcon name="Plus" className="w-4 h-4" />
        {action}
      </Button>
    </div>
  );
};

export default Empty;