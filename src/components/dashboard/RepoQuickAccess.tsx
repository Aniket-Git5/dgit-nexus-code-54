import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  GitBranch, 
  Star, 
  Clock, 
  Lock, 
  Globe,
  Eye,
  Plus
} from 'lucide-react';

const RepoQuickAccess = () => {
  const repositories = [
    {
      id: 1,
      name: 'defi-yield-aggregator',
      owner: 'decentralized_dev',
      description: 'Multi-protocol yield farming aggregator with automated strategies',
      language: 'Solidity',
      stars: 234,
      visibility: 'public',
      lastUpdated: '2 hours ago',
      isPinned: true
    },
    {
      id: 2,
      name: 'dao-governance-contracts',
      owner: 'decentralized_dev',
      description: 'Modular DAO governance system with delegated voting',
      language: 'Solidity',
      stars: 156,
      visibility: 'public',
      lastUpdated: '1 day ago',
      isPinned: true
    },
    {
      id: 3,
      name: 'nft-marketplace-frontend',
      owner: 'decentralized_dev',
      description: 'React frontend for decentralized NFT marketplace',
      language: 'TypeScript',
      stars: 89,
      visibility: 'private',
      lastUpdated: '3 days ago',
      isPinned: false
    },
    {
      id: 4,
      name: 'cross-chain-bridge',
      owner: 'decentralized_dev',
      description: 'Secure asset bridge between Ethereum and Layer 2 solutions',
      language: 'Solidity',
      stars: 312,
      visibility: 'public',
      lastUpdated: '5 days ago',
      isPinned: false
    }
  ];

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Solidity': return 'bg-blue-500';
      case 'TypeScript': return 'bg-blue-600';
      case 'JavaScript': return 'bg-yellow-500';
      case 'Python': return 'bg-green-500';
      case 'Rust': return 'bg-orange-500';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Your dRepositories
          </CardTitle>
          <Button variant="outline" size="sm" className="card-elevated">
            <Plus className="h-4 w-4 mr-2" />
            New dRepo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {repositories.slice(0, 3).map((repo) => (
            <div key={repo.id} className="card-interactive p-4 group">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                      {repo.owner}/{repo.name}
                    </h4>
                    {repo.isPinned && (
                      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 text-xs">
                        Pinned
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      {repo.visibility === 'public' ? (
                        <>
                          <Globe className="h-3 w-3" />
                          Public
                        </>
                      ) : (
                        <>
                          <Lock className="h-3 w-3" />
                          Private
                        </>
                      )}
                    </Badge>
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
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Updated {repo.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View all repositories */}
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="outline" className="w-full card-elevated">
            View all {repositories.length} dRepositories
          </Button>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">12</div>
            <div className="text-xs text-muted-foreground">Total Repos</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">891</div>
            <div className="text-xs text-muted-foreground">Total Stars</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">45</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoQuickAccess;