import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BottomNavItem = ({ to, icon, label, isActive = false }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center justify-center py-2 px-3 transition-all duration-200",
        isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"
      )}
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            className={cn(
              "w-6 h-6 mb-1",
              isActive && "fill-current"
            )}
          />
          <span className="text-xs font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default BottomNavItem;