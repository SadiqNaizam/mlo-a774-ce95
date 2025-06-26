import React, { useState } from 'react';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';
import KanbanBoard from '@/components/KanbanBoard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';

// Icons
import { List, Kanban, MoreHorizontal, ArrowUpDown } from 'lucide-react';

// Type Definitions (matching KanbanBoard component)
type ColumnId = 'new' | 'in-progress' | 'submitted' | 'won' | 'lost';

interface RFP {
  id: string;
  title: string;
  client: string;
  value: number;
  columnId: ColumnId;
  dueDate: string;
}

// Sample Data
const initialRfpData: RFP[] = [
  { id: 'rfp-1', title: 'Enterprise Software Overhaul', client: 'Innovate Corp', value: 250000, columnId: 'new', dueDate: '2024-08-30' },
  { id: 'rfp-2', title: 'Cloud Migration Strategy', client: 'DataStream LLC', value: 150000, columnId: 'new', dueDate: '2024-09-15' },
  { id: 'rfp-3', title: 'Marketing Analytics Platform', client: 'MarketMinds', value: 75000, columnId: 'in-progress', dueDate: '2024-08-25' },
  { id: 'rfp-4', title: 'Security Infrastructure Audit', client: 'SecureNet', value: 120000, columnId: 'submitted', dueDate: '2024-08-10' },
  { id: 'rfp-5', title: 'Website Redesign', client: 'Creative Solutions', value: 50000, columnId: 'won', dueDate: '2024-07-20' },
  { id: 'rfp-6', title: 'Mobile App Development', client: 'AppMakers', value: 95000, columnId: 'lost', dueDate: '2024-07-01' },
];

const RFPPipeline = () => {
  console.log('RFPPipeline page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [rfpData, setRfpData] = useState<RFP[]>(initialRfpData);
  
  const handleToggleSidebar = () => setIsCollapsed(!isCollapsed);
  
  const handleNewRfpClick = () => {
    // This would typically open a MultiStepWizardForm in a dialog
    console.log("Trigger 'New RFP' wizard...");
  };

  const handleCardMove = (cardId: string, newColumnId: ColumnId) => {
    setRfpData(prevData =>
      prevData.map(card =>
        card.id === cardId ? { ...card, columnId: newColumnId } : card
      )
    );
  };
  
  const getStatusBadgeVariant = (status: ColumnId) => {
    switch (status) {
      case 'won':
        return 'default'; // Greenish in default shadcn
      case 'in-progress':
      case 'submitted':
        return 'secondary'; // Bluish/Grayish
      case 'lost':
        return 'destructive'; // Reddish
      case 'new':
      default:
        return 'outline'; // Neutral
    }
  };

  const statusTextMap: Record<ColumnId, string> = {
    new: "New",
    "in-progress": "In Progress",
    submitted: "Submitted",
    won: "Won",
    lost: "Lost",
  };


  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar isCollapsed={isCollapsed} onToggle={handleToggleSidebar} />
      <div className="flex flex-1 flex-col">
        <AppHeader onNewRfpClick={handleNewRfpClick} />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 flex flex-col gap-4">
          <div className="flex items-center pt-4">
            <h1 className="text-lg font-semibold md:text-2xl flex-1">RFP Pipeline</h1>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => {
                if (value) setViewMode(value as 'kanban' | 'table');
              }}
              aria-label="View mode"
            >
              <ToggleGroupItem value="kanban" aria-label="Kanban view">
                <Kanban className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Table view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex-1">
            {viewMode === 'kanban' ? (
              <KanbanBoard initialCards={rfpData} onCardMove={handleCardMove} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>All RFPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost">
                            Title <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead className="text-right">
                           <Button variant="ghost">
                            Value <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rfpData.map((rfp) => (
                        <TableRow key={rfp.id}>
                          <TableCell className="font-medium">{rfp.title}</TableCell>
                          <TableCell>{rfp.client}</TableCell>
                          <TableCell className="text-right">${rfp.value.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(rfp.columnId)}>
                              {statusTextMap[rfp.columnId]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>

        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default RFPPipeline;