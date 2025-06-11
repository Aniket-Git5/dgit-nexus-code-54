import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import RepoQuickAccess from '@/components/dashboard/RepoQuickAccess';
import DiscoverRecommendations from '@/components/dashboard/DiscoverRecommendations';

const Dashboard = () => {

  return (
    <div className="min-h-screen bg-background web3-gradient">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <main className="pt-20">
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
  );
};

export default Dashboard;