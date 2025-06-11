import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Vote, ArrowRight } from 'lucide-react';

const WelcomeBanner = () => {
  return (
    <Card className="card-elevated web3-gradient">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Welcome Section */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Welcome back, <span className="text-primary">0xAbc...Xyz</span>
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your Web3 portfolio today.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 card-elevated px-3 py-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">2 pending transactions</span>
              </div>
              <div className="flex items-center gap-2 card-elevated px-3 py-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-foreground">3 active stakes</span>
              </div>
              <div className="flex items-center gap-2 card-elevated px-3 py-2">
                <Vote className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-foreground">1 new proposal</span>
                <Badge className="ml-1 bg-cta text-cta-foreground">New</Badge>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="btn-primary flex items-center gap-2">
              Start Transaction
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="card-elevated">
              Explore dApps
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;