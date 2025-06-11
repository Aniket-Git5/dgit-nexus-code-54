import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Wallet,
  Star,
  Clock,
  Globe,
  Coins,
  TrendingUp,
  Vote,
  ChevronDown,
  ChevronRight,
  Activity,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState('tokens');
  const [openSections, setOpenSections] = useState(['assets', 'activity']);

  const menuItems = [
    {
      id: 'assets',
      title: 'My Assets',
      items: [
        { id: 'tokens', icon: Coins, label: 'My Tokens', count: 12 },
        { id: 'nfts', icon: Star, label: 'My NFTs', count: 8 },
        { id: 'transactions', icon: Clock, label: 'Transactions', count: null }
      ]
    },
    {
      id: 'protocols',
      title: 'Protocols',
      items: [
        { id: 'dapps', icon: Globe, label: 'My dApps', count: 5 },
        { id: 'staking', icon: TrendingUp, label: 'Staking', count: 3 },
        { id: 'governance', icon: Vote, label: 'DAO Governance', count: 2 }
      ]
    },
    {
      id: 'activity',
      title: 'Activity',
      items: [
        { id: 'recent', icon: Activity, label: 'Recent Activity', count: null },
        { id: 'explore', icon: Globe, label: 'Explore dApps', count: null }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-20 left-0 bottom-0 z-50 
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 lg:static lg:top-0
        w-72 bg-card/30 backdrop-blur-md border-r border-border
        transition-transform duration-300 ease-in-out
        web3-shadow
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <span className="font-semibold text-foreground">Navigation</span>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuItems.map(section => (
              <div key={section.id}>
                <Collapsible 
                  open={openSections.includes(section.id)}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-muted-foreground hover:text-foreground p-2"
                    >
                      <span className="font-medium">{section.title}</span>
                      {openSections.includes(section.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2">
                    {section.items.map(item => (
                      <Button
                        key={item.id}
                        variant={activeSection === item.id ? "secondary" : "ghost"}
                        className={`
                          w-full justify-start p-3 h-auto transition-all duration-200
                          ${activeSection === item.id 
                            ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                            : 'hover:bg-accent/50 text-foreground'
                          }
                        `}
                        onClick={() => setActiveSection(item.id)}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.count && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.count}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>

          {/* Bottom section - maybe add user stats or quick actions */}
          <div className="p-4 border-t border-border">
            <div className="card-elevated p-3 text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
              <div className="text-lg font-bold text-foreground">$12,345.67</div>
              <div className="text-xs text-green-500">+2.34% (24h)</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-24 left-4 z-40 lg:hidden card-elevated"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
};

export default DashboardSidebar;