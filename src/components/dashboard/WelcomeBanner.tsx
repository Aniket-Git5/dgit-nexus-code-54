import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GitBranch, Star, Users, ArrowRight, Plus, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserData {
  username: string;
  displayName?: string;
  avatar?: string;
  totalRepos: number;
  totalStars: number;
  followers: number;
  newFollowers: number;
}

const WelcomeBanner = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    totalRepos: 0,
    totalStars: 0,
    followers: 0,
    newFollowers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real-time Supabase query
    // const fetchUserData = async () => {
    //   const { data: user } = await supabase.auth.getUser();
    //   if (user.user) {
    //     const { data: profile } = await supabase
    //       .from('profiles')
    //       .select('username, display_name, avatar_url')
    //       .eq('id', user.user.id)
    //       .single();
    //     
    //     const { data: stats } = await supabase
    //       .from('user_stats')
    //       .select('total_repos, total_stars, followers, new_followers')
    //       .eq('user_id', user.user.id)
    //       .single();
    //     
    //     setUserData({
    //       username: profile?.username || 'user',
    //       displayName: profile?.display_name,
    //       avatar: profile?.avatar_url,
    //       totalRepos: stats?.total_repos || 0,
    //       totalStars: stats?.total_stars || 0,
    //       followers: stats?.followers || 0,
    //       newFollowers: stats?.new_followers || 0
    //     });
    //   }
    // };
    // 
    // fetchUserData();
    setIsLoading(false);
  }, []);

  return (
    <Card className="card-elevated web3-gradient">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 w-full overflow-hidden">
          {/* Welcome Section */}
          <div className="space-y-4 flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userData.avatar} alt={userData.username} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {userData.username ? userData.username.slice(0, 2).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-8 bg-muted animate-pulse rounded"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 break-words">
                      Welcome back, <span className="text-primary">@{userData.username || 'user'}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Here's what's happening in your dGit network today.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center gap-2 card-elevated px-3 py-2 min-w-0">
                <GitBranch className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-foreground truncate">
                  {isLoading ? '...' : userData.totalRepos} dRepositories
                </span>
              </div>
              <div className="flex items-center gap-2 card-elevated px-3 py-2 min-w-0">
                <Star className="h-4 w-4 text-yellow-500 shrink-0" />
                <span className="text-sm text-foreground truncate">
                  {isLoading ? '...' : userData.totalStars} stars received
                </span>
              </div>
              <div className="flex items-center gap-2 card-elevated px-3 py-2 min-w-0">
                <Users className="h-4 w-4 text-blue-500 shrink-0" />
                <span className="text-sm text-foreground truncate">
                  {isLoading ? '...' : userData.followers} followers
                </span>
                {userData.newFollowers > 0 && (
                  <Badge className="ml-1 bg-cta text-cta-foreground shrink-0">
                    +{userData.newFollowers}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button className="btn-primary flex items-center gap-2 whitespace-nowrap" asChild>
              <Link to="/create">
                <Plus className="h-4 w-4 shrink-0" />
                <span className="truncate">New dRepository</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
            <Button variant="outline" className="card-elevated flex items-center gap-2 whitespace-nowrap">
              <Compass className="h-4 w-4 shrink-0" />
              <span className="truncate">Explore dGit</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;