import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Star, Users, ArrowRight, Plus, Compass } from 'lucide-react';

const WelcomeBanner = () => {
  return (
    <Card className="card-elevated web3-gradient">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Welcome Section */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-primary">@decentralized_dev</span>
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening in your dGit network today.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 card-elevated px-3 py-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">12 dRepositories</span>
              </div>
              <div className="flex items-center gap-2 card-elevated px-3 py-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-foreground">891 stars received</span>
              </div>
              <div className="flex items-center gap-2 card-elevated px-3 py-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-foreground">45 followers</span>
                <Badge className="ml-1 bg-cta text-cta-foreground">+3</Badge>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="btn-primary flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New dRepository
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="card-elevated flex items-center gap-2">
              <Compass className="h-4 w-4" />
              Explore dGit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;