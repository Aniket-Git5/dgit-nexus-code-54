import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  GitBranch, 
  Star, 
  Users, 
  MessageSquare, 
  GitCommit, 
  GitPullRequest,
  Clock,
  Filter
} from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  avatar?: string;
  action: string;
  target: string;
  branch?: string;
  timestamp: string;
  type: 'commit' | 'star' | 'issue' | 'repo' | 'comment' | 'fork';
  details?: string;
}

const ActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Replace with real-time Supabase subscription
    // const subscription = supabase
    //   .channel('activities')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'activities' }, handleActivityChange)
    //   .subscribe();
    
    // return () => subscription.unsubscribe();
    setIsLoading(false);
  }, []);

  const handleActivityChange = (payload: any) => {
    // TODO: Handle real-time activity updates
    // setActivities(prev => [payload.new, ...prev]);
  };

  const loadMoreActivities = () => {
    // TODO: Implement pagination with Supabase
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit': return <GitCommit className="h-4 w-4 text-green-500" />;
      case 'star': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'issue': return <MessageSquare className="h-4 w-4 text-red-500" />;
      case 'repo': return <GitBranch className="h-4 w-4 text-blue-500" />;
      case 'comment': return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case 'fork': return <GitBranch className="h-4 w-4 text-orange-500" />;
      default: return <GitCommit className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'commit': return <Badge variant="secondary" className="bg-green-500/10 text-green-500">Commit</Badge>;
      case 'star': return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">Star</Badge>;
      case 'issue': return <Badge variant="secondary" className="bg-red-500/10 text-red-500">Issue</Badge>;
      case 'repo': return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Repository</Badge>;
      case 'comment': return <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Comment</Badge>;
      case 'fork': return <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Fork</Badge>;
      default: return <Badge variant="secondary">Activity</Badge>;
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Latest Activity Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="card-elevated">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 w-full overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading activities...</p>
              </div>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8">
              <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No recent activity</h3>
              <p className="text-muted-foreground">Activity from your network will appear here</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="card-interactive p-4 group w-full overflow-hidden">
                <div className="flex items-start gap-3 w-full overflow-hidden">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback className="text-xs bg-primary/10">
                      {activity.user.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2 min-w-0 overflow-hidden">
                    <div className="flex items-start gap-2 flex-wrap">
                      {getActivityIcon(activity.type)}
                      <span className="text-sm text-foreground min-w-0 break-words">
                        <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                        <span className="font-medium text-primary break-all">{activity.target}</span>
                        {activity.branch && (
                          <span className="text-muted-foreground"> on {activity.branch}</span>
                        )}
                      </span>
                    </div>
                    
                    {activity.details && (
                      <p className="text-sm text-muted-foreground pl-6 break-words">
                        {activity.details}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between pl-6 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {getActivityBadge(activity.type)}
                        <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load more */}
        {activities.length > 0 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              className="card-elevated"
              onClick={loadMoreActivities}
            >
              Load More Activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;