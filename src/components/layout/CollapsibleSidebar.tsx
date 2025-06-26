import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  AreaChart, 
  Users, 
  Settings, 
  LifeBuoy, 
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface CollapsibleSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/r-f-p-pipeline", icon: KanbanSquare, label: "RFP Pipeline" },
  { to: "/analytics", icon: AreaChart, label: "Analytics" },
  { to: "/client-management", icon: Users, label: "Clients" },
];

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ isCollapsed, onToggle }) => {
  console.log('CollapsibleSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
      { "bg-muted text-primary": isActive },
      isCollapsed ? 'justify-center' : ''
    );
  
  const linkContent = (item: typeof navItems[0]) => (
    <>
      <item.icon className="h-4 w-4" />
      {!isCollapsed && <span className="truncate">{item.label}</span>}
      <span className="sr-only">{item.label}</span>
    </>
  );

  return (
    <aside className={cn(
        "hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6 justify-between">
          <Link to="/" className={cn(
            "flex items-center gap-2 font-semibold",
            { "hidden": isCollapsed }
          )}>
            <KanbanSquare className="h-6 w-6 text-primary" />
            <span className="">RFP Pro</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <ChevronLeft className={cn("h-5 w-5 transition-transform", { "rotate-180": isCollapsed })} />
          </Button>
        </div>
        <div className="flex-1">
          <nav className={cn("grid items-start gap-1 text-sm font-medium", isCollapsed ? "px-2" : "px-2 lg:px-4")}>
            {navItems.map((item) => (
              isCollapsed ? (
                <Tooltip key={item.to} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <NavLink to={item.to} className={navLinkClasses}>
                      {linkContent(item)}
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <NavLink key={item.to} to={item.to} className={navLinkClasses}>
                  {linkContent(item)}
                </NavLink>
              )
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
            <nav className={cn("grid items-start gap-1 text-sm font-medium", isCollapsed ? "px-0" : "px-0")}>
                 <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                     <NavLink to="#" className={navLinkClasses}>
                         <Settings className="h-4 w-4" />
                         {!isCollapsed && <span>Settings</span>}
                         <span className="sr-only">Settings</span>
                     </NavLink>
                  </TooltipTrigger>
                   {isCollapsed && <TooltipContent side="right">Settings</TooltipContent>}
                 </Tooltip>
                 <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                     <NavLink to="#" className={navLinkClasses}>
                         <LifeBuoy className="h-4 w-4" />
                         {!isCollapsed && <span>Help & Support</span>}
                         <span className="sr-only">Help & Support</span>
                     </NavLink>
                  </TooltipTrigger>
                   {isCollapsed && <TooltipContent side="right">Help & Support</TooltipContent>}
                 </Tooltip>
            </nav>
        </div>
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;