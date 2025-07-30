import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../App';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const LogoutButton = ({ className = "" }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {user && (
        <div className="text-sm text-gray-600">
          Welcome, {user.firstName || user.name || 'User'}
        </div>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="flex items-center space-x-2"
      >
        <ApperIcon name="LogOut" size={16} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default LogoutButton;