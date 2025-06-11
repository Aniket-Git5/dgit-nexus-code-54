import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import ActivityOverview from '@/components/dashboard/ActivityOverview';
import PinnedItems from '@/components/dashboard/PinnedItems';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DiscoverSection from '@/components/dashboard/DiscoverSection';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background web3-gradient">
      {/* Header */}
      <DashboardHeader />
      
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
            
            {/* Activity Overview */}
            <ActivityOverview />
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <PinnedItems />
              </div>
              
              {/* Right Column */}
              <div className="space-y-8">
                <RecentActivity />
              </div>
            </div>
            
            {/* Discover Section */}
            <DiscoverSection />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;