import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, PlusCircle, KanbanSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AppHeaderProps {
  onNewRfpClick: () => void; // Placeholder for triggering the wizard form
}

const AppHeader: React.FC<AppHeaderProps> = ({ onNewRfpClick }) => {
  console.log('AppHeader loaded');

  // Mobile nav items can be simplified here
  const mobileNavItems = [
    { to: "/", label: "Dashboard" },
    { to: "/r-f-p-pipeline", label: "RFP Pipeline" },
    { to: "/analytics", label: "Analytics" },
    { to: "/client-management", label: "Clients" },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {/* This space is managed by the sidebar */}
      </nav>
      
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <KanbanSquare className="h-6 w-6 text-primary" />
              <span>RFP Pro</span>
            </Link>
            {mobileNavItems.map(item => (
                 <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                 </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center justify-end gap-4">
        <Button onClick={onNewRfpClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New RFP
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;