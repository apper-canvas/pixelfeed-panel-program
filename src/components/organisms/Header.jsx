import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Header = ({ title, showBack = false, showActions = true, className }) => {
  return (
    <header className={cn(
      "sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3",
      className
    )}>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {showBack ? (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.history.back()}
          >
            <ApperIcon name="ArrowLeft" className="w-6 h-6" />
          </Button>
        ) : (
          <div className="w-10" />
        )}

        <h1 className="text-2xl font-display font-bold gradient-text">
          {title || "PixelFeed"}
        </h1>

        {showActions ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ApperIcon name="Heart" className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <ApperIcon name="MessageCircle" className="w-6 h-6" />
            </Button>
          </div>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </header>
  );
};

export default Header;