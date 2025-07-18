import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { GitBranch, Search, Bell, Plus, ChevronDown, User, Settings, Star, File, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

interface UserProfile {
  username: string;
  avatar?: string;
}

const DashboardHeader = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile>({ username: '' });
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real-time Supabase queries
    // const fetchUserProfile = async () => {
    //   const { data: user } = await supabase.auth.getUser();
    //   if (user.user) {
    //     const { data: profile } = await supabase
    //       .from('profiles')
    //       .select('username, avatar_url')
    //       .eq('id', user.user.id)
    //       .single();
    //     
    //     setCurrentUser({
    //       username: profile?.username || 'user',
    //       avatar: profile?.avatar_url
    //     });
    //   }
    // };
    
    // const fetchNotifications = async () => {
    //   const { data } = await supabase
    //     .from('notifications')
    //     .select('id')
    //     .eq('user_id', user.user.id)
    //     .eq('read', false);
    //   
    //   setNotificationCount(data?.length || 0);
    // };
    
    // fetchUserProfile();
    // fetchNotifications();
    setIsLoading(false);
  }, []);

  const handleSignOut = async () => {
    // TODO: Implement sign out with Supabase
    // await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border web3-shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Sidebar Toggle + Logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-accent/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <DashboardSidebar isCollapsed={false} onToggle={() => {}} />
              </SheetContent>
            </Sheet>
            <GitBranch className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground purple-glow">dGit</span>
          </div>

          {/* Global Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search dRepositories, users, issues, discussions..."
                className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* New Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="card-elevated flex items-center gap-2 hover:border-primary/30">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">New</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 card-elevated">
                <DropdownMenuItem className="flex items-center gap-2" asChild>
                  <Link to="/create">
                    <GitBranch className="h-4 w-4" />
                    New dRepository
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  New dGist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  New dOrganization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative card-elevated">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cta text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="card-elevated flex items-center gap-2 hover:border-primary/30">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                    <AvatarFallback className="text-xs bg-primary/10">
                      {currentUser.username ? currentUser.username.slice(0, 2).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">{currentUser.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 card-elevated">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Your Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Your dRepositories
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Your Stars
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;