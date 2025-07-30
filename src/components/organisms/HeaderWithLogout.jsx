import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import LogoutButton from '@/components/organisms/LogoutButton'
import { useLocation } from 'react-router-dom'

function Header({ onMobileMenuToggle }) {
  const location = useLocation()

  function getPageTitle() {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/jobs':
        return 'Job Openings'
      case '/candidates':
        return 'Candidate Pool'
      case '/clients':
        return 'Clients'
      default:
        return 'TalentBridge'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <ApperIcon name="Menu" size={24} />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900 font-display">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

export default Header