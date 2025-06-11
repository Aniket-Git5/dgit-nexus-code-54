import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import RepoQuickAccess from '@/components/dashboard/RepoQuickAccess';
import DiscoverRecommendations from '@/components/dashboard/DiscoverRecommendations';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background web3-gradient">
      {/* Header */}
      <DashboardHeader 
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={toggleSidebar}
      />
      
      <div className="flex w-full">
        {/* Sidebar */}
        <DashboardSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        
        {/* Main Content */}
        <main className={`
          flex-1 pt-20 transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-72'}
        `}>
          <div className="container mx-auto px-6 py-8 space-y-8 max-w-7xl">
            {/* Welcome Section */}
            <WelcomeBanner />
            
            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Activity Feed */}
              <div className="xl:col-span-2">
                <ActivityFeed />
              </div>
              
              {/* Right Column - Quick Access & Recommendations */}
              <div className="space-y-8">
                <RepoQuickAccess />
                <DiscoverRecommendations />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;