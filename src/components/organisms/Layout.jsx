import Header from "@/components/organisms/Header";
import BottomNavigation from "@/components/organisms/BottomNavigation";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case "/":
        return "PixelFeed";
      case "/search":
        return "Search";
      case "/create":
        return "Create Post";
      case "/profile":
        return "Profile";
      default:
        return "PixelFeed";
    }
  };

  const showBackButton = () => {
    return location.pathname.startsWith("/post/") || 
           location.pathname.startsWith("/profile/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={getHeaderTitle()}
        showBack={showBackButton()}
        showActions={location.pathname === "/"}
      />
      
      <main className="max-w-md mx-auto pb-20 px-4">
        <div className="pt-4">
          {children}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;