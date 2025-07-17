import BottomNavItem from "@/components/molecules/BottomNavItem";
import { cn } from "@/utils/cn";

const BottomNavigation = ({ className }) => {
  const navItems = [
    { to: "/", icon: "Home", label: "Home" },
    { to: "/search", icon: "Search", label: "Search" },
    { to: "/create", icon: "PlusSquare", label: "Create" },
    { to: "/profile", icon: "User", label: "Profile" }
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50",
      className
    )}>
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => (
          <BottomNavItem 
            key={item.to} 
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;