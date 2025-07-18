import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  GitBranch, 
  Star, 
  Users, 
  Globe,
  TrendingUp,
  Compass,
  User,
  Plus
} from 'lucide-react';

interface TrendingRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  todayStars: number;
  avatar?: string;
}

interface RecommendedUser {
  id: string;
  username: string;
  name: string;
  bio: string;
  followers: number;
  avatar?: string;
  isFollowing: boolean;
}

interface TrendingTopic {
  name: string;
  count: number;
  trending: boolean;
}

const DiscoverRecommendations = () => {
  const [trendingRepos, setTrendingRepos] = useState<TrendingRepo[]>([]);
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real-time Supabase queries
    // const fetchTrendingRepos = async () => {
    //   const { data } = await supabase
    //     .from('trending_repositories')
    //     .select('*')
    //     .order('today_stars', { ascending: false })
    //     .limit(3);
    //   setTrendingRepos(data || []);
    // };
    
    // const fetchRecommendedUsers = async () => {
    //   const { data } = await supabase
    //     .from('recommended_users')
    //     .select('*')
    //     .limit(3);
    //   setRecommendedUsers(data || []);
    // };
    
    // const fetchTrendingTopics = async () => {
    //   const { data } = await supabase
    //     .from('trending_topics')
    //     .select('*')
    //     .order('count', { ascending: false });
    //   setTrendingTopics(data || []);
    // };
    
    // fetchTrendingRepos();
    // fetchRecommendedUsers();
    // fetchTrendingTopics();
    setIsLoading(false);
  }, []);

  const handleFollowUser = async (userId: string) => {
    // TODO: Implement follow/unfollow with Supabase
    setRecommendedUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, isFollowing: !user.isFollowing }
          : user
      )
    );
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Solidity': return 'bg-blue-500';
      case 'Python': return 'bg-green-500';
      case 'JavaScript': return 'bg-yellow-500';
      case 'TypeScript': return 'bg-blue-600';
      case 'Rust': return 'bg-orange-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Trending Repositories */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending dRepositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading trending repositories...</p>
              </div>
            </div>
          ) : trendingRepos.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No trending repositories</h3>
              <p className="text-muted-foreground">Check back later for trending content</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trendingRepos.map((repo) => (
                <div key={repo.id} className="card-interactive p-3 group">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={repo.avatar} alt={repo.name} />
                      <AvatarFallback className="text-xs bg-primary/10">
                        <GitBranch className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground hover:text-primary cursor-pointer">
                          {repo.name}
                        </h4>
                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Star className="h-3 w-3 mr-1" />
                          Star
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {repo.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                          <span>{repo.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{repo.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-500">
                          <TrendingUp className="h-3 w-3" />
                          <span>+{repo.todayStars} today</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {trendingRepos.length > 0 && (
            <div className="mt-4">
              <Button variant="outline" className="w-full card-elevated">
                <Compass className="h-4 w-4 mr-2" />
                Explore More dRepositories
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Users */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5" />
            Who to Follow
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading recommended users...</p>
              </div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No recommendations</h3>
              <p className="text-muted-foreground">Check back later for user recommendations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 card-interactive group">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback className="text-xs bg-primary/10">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{user.name}</h4>
                        <span className="text-sm text-muted-foreground">@{user.username}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.bio}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{user.followers.toLocaleString()} followers</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant={user.isFollowing ? "secondary" : "outline"} 
                    size="sm"
                    className="card-elevated"
                    onClick={() => handleFollowUser(user.id)}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {recommendedUsers.length > 0 && (
            <div className="mt-4">
              <Button variant="outline" className="w-full card-elevated">
                <User className="h-4 w-4 mr-2" />
                Discover More Developers
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading trending topics...</p>
              </div>
            </div>
          ) : trendingTopics.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No trending topics</h3>
              <p className="text-muted-foreground">Check back later for trending topics</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="card-elevated h-auto p-3 flex-col items-start hover:border-primary/30"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-medium text-foreground">#{topic.name}</span>
                    {topic.trending && (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {topic.count} repositories
                  </span>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscoverRecommendations;