import React, { useState } from 'react';

// Layout Components
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';

// Shadcn/UI Components
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Icons
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Client data type and mock data
interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  rfpCount: number;
}

const initialClients: Client[] = [
  { id: 'CLI001', name: 'Innovate Corp', contactPerson: 'John Doe', email: 'john.d@innovate.com', rfpCount: 5 },
  { id: 'CLI002', name: 'Solutions Inc.', contactPerson: 'Jane Smith', email: 'jane.s@solutions.com', rfpCount: 3 },
  { id: 'CLI003', name: 'Synergy Partners', contactPerson: 'Peter Jones', email: 'peter.j@synergy.com', rfpCount: 8 },
  { id: 'CLI004', name: 'Tech Giants LLC', contactPerson: 'Mary Johnson', email: 'mary.j@techgiants.com', rfpCount: 2 },
  { id: 'CLI005', name: 'Future Systems', contactPerson: 'David Brown', email: 'david.b@future.com', rfpCount: 10 },
];

const ClientManagement = () => {
  console.log('ClientManagement page loaded');

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const handleNewRfpClick = () => {
    // Placeholder for triggering the multi-step RFP creation wizard
    console.log("Trigger 'New RFP' wizard from AppHeader");
    alert("New RFP creation flow would start here.");
  };

  const handleAddNewClick = () => {
    setEditingClient(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (clientId: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
        setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newClientData = {
        name: formData.get('name') as string,
        contactPerson: formData.get('contactPerson') as string,
        email: formData.get('email') as string,
    };

    if (editingClient) {
        // Update existing client
        setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...newClientData } : c));
    } else {
        // Add new client
        const newClient = {
            ...newClientData,
            id: `CLI${String(clients.length + 1).padStart(3, '0')}`,
            rfpCount: 0,
        };
        setClients([...clients, newClient]);
    }
    setIsDialogOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="flex min-h-screen w-full">
      <CollapsibleSidebar isCollapsed={isSidebarCollapsed} onToggle={handleToggleSidebar} />
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <AppHeader onNewRfpClick={handleNewRfpClick} />
        <main className="flex-1 flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-y-auto">
            <div className="flex items-center pt-4">
                <h1 className="text-2xl font-semibold">Client Management</h1>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" onClick={handleAddNewClick}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Client
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Clients</CardTitle>
                    <CardDescription>
                        A list of all clients in your system. You can add, edit, or delete records.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Associated RFPs</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>{client.contactPerson}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell className="text-center">{client.rfpCount}</TableCell>
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
                                                <DropdownMenuItem onClick={() => handleEditClick(client)}>
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(client.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
        <AppFooter />
      </div>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>\n        <DialogContent className=\"sm:max-w-[425px]\">\n          <DialogHeader>\n            <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>\n            <DialogDescription>\n              {editingClient ? 'Update the details for this client.' : 'Fill in the information for the new client.'}\n            </DialogDescription>\n          </DialogHeader>\n          <form id=\"client-form\" onSubmit={handleFormSubmit}>\n            <div className=\"grid gap-4 py-4\">\n              <div className=\"grid grid-cols-4 items-center gap-4\">\n                <Label htmlFor=\"name\" className=\"text-right\">\n                  Name\n                </Label>\n                <Input id=\"name\" name=\"name\" defaultValue={editingClient?.name || ''} className=\"col-span-3\" required />\n              </div>\n              <div className=\"grid grid-cols-4 items-center gap-4\">\n                <Label htmlFor=\"contactPerson\" className=\"text-right\">\n                  Contact\n                </Label>\n                <Input id=\"contactPerson\" name=\"contactPerson\" defaultValue={editingClient?.contactPerson || ''} className=\"col-span-3\" required />\n              </div>\n              <div className=\"grid grid-cols-4 items-center gap-4\">\n                <Label htmlFor=\"email\" className=\"text-right\">\n                  Email\n                </Label>\n                <Input id=\"email\" name=\"email\" type=\"email\" defaultValue={editingClient?.email || ''} className=\"col-span-3\" required />\n              </div>\n            </div>\n          </form>\n          <DialogFooter>\n            <Button variant=\"outline\" onClick={() => setIsDialogOpen(false)}>Cancel</Button>\n            <Button type=\"submit\" form=\"client-form\">Save changes</Button>\n          </DialogFooter>\n        </DialogContent>\n      </Dialog>\n    </div>\n  );\n};\n\nexport default ClientManagement;