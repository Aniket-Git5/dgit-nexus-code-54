import { useState } from 'react';
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
import { GitBranch, Search, Bell, Settings, Copy, ExternalLink, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardHeader = () => {
  const [connectedWallet] = useState('0xAbc...Xyz');
  const [network] = useState('Ethereum Mainnet');
  const [notificationCount] = useState(3);
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('0xAbcdefghijklmnopqrstuvwxyz123456789');
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleViewOnExplorer = () => {
    window.open('https://etherscan.io/address/0xAbcdefghijklmnopqrstuvwxyz123456789', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border web3-shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <GitBranch className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground purple-glow">dGit</span>
          </div>

          {/* Global Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search dApps, transactions, addresses..."
                className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Connect Wallet Button or Wallet Info */}
            {connectedWallet ? (
              <div className="flex items-center gap-3">
                {/* Network Status */}
                <div className="hidden lg:flex items-center gap-2 card-elevated px-3 py-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-foreground">{network}</span>
                </div>

                {/* Connected Wallet */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="card-elevated flex items-center gap-2 hover:border-primary/30">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" alt="Wallet" />
                        <AvatarFallback className="text-xs">{connectedWallet.slice(2, 4).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{connectedWallet}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 card-elevated">
                    <DropdownMenuItem onClick={handleCopyAddress} className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleViewOnExplorer} className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View on Explorer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Wallet Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">
                      Disconnect Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button className="btn-primary">
                Connect Wallet
              </Button>
            )}

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative card-elevated">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cta text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* Profile/Settings */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="card-elevated">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="card-elevated">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;