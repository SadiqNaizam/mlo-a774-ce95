import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  History,
  Info,
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data for a single RFP
const rfpDetail = {
  id: 'RFP-001',
  title: 'Next-Gen Enterprise CRM Solution',
  client: 'Innovatech Corp',
  status: 'In Progress',
  value: 250000,
  dueDate: '2024-12-15',
  submittedDate: 'N/A',
  progress: 65,
  summary: 'A comprehensive proposal to overhaul Innovatech\'s customer relationship management system with our cloud-native platform, focusing on scalability and user experience.',
  documents: [
    { id: 'doc1', name: 'RFP_Requirements.pdf', size: '2.5 MB', uploaded: '2024-10-26' },
    { id: 'doc2', name: 'Technical_Specifications_v1.docx', size: '1.8 MB', uploaded: '2024-10-28' },
  ],
  tasks: [
    { id: 'task1', description: 'Initial proposal draft', completed: true },
    { id: 'task2', description: 'Technical review with engineering', completed: true },
    { id: 'task3', description: 'Pricing model finalization', completed: false },
    { id: 'task4', description: 'Final submission package assembly', completed: false },
  ],
  history: [
    { id: 'hist1', event: 'RFP Created by Jane Doe', timestamp: '2024-10-25 10:00 AM' },
    { id: 'hist2', event: 'Document "RFP_Requirements.pdf" uploaded', timestamp: '2024-10-26 02:30 PM' },
    { id: 'hist3', event: 'Status changed to "In Progress"', timestamp: '2024-10-27 09:15 AM' },
  ],
};


const RFPDetailView = () => {
  console.log('RFPDetailView loaded');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNewRfpClick = () => {
    // Placeholder for triggering the new RFP wizard
    console.log("Trigger 'New RFP' wizard from detail view");
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>
        <AppHeader onNewRfpClick={handleNewRfpClick} />
        
        <main className="flex-1 p-4 sm:px-6 md:p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{rfpDetail.title}</h1>
                    <p className="text-muted-foreground">RFP ID: {rfpDetail.id}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Edit RFP</Button>
                    <Button>Submit Proposal</Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="documents"><FileText className="mr-2 h-4 w-4"/>Documents</TabsTrigger>
              <TabsTrigger value="tasks"><CheckSquare className="mr-2 h-4 w-4"/>Tasks</TabsTrigger>
              <TabsTrigger value="history"><History className="mr-2 h-4 w-4"/>History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>RFP Summary</CardTitle>
                    <CardDescription>High-level details about this proposal.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{rfpDetail.summary}</p>
                    <div>
                        <label className="text-sm font-medium">Progress</label>
                        <Progress value={rfpDetail.progress} className="w-full mt-1" />
                        <p className="text-sm text-right text-muted-foreground mt-1">{rfpDetail.progress}% complete</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center"><Users className="mr-2 h-4 w-4"/>Client</span>
                        <strong>{rfpDetail.client}</strong>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center"><DollarSign className="mr-2 h-4 w-4"/>Value</span>
                        <strong>${rfpDetail.value.toLocaleString()}</strong>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center"><Calendar className="mr-2 h-4 w-4"/>Due Date</span>
                        <span>{rfpDetail.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={rfpDetail.status === 'In Progress' ? 'secondary' : 'default'}>{rfpDetail.status}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                     <Button variant="link" className="w-full p-0 h-auto">View Client Details</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Associated Documents</CardTitle>
                  <CardDescription>All files related to this RFP.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {rfpDetail.documents.map(doc => (
                            <li key={doc.id} className="flex items-center justify-between p-2 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">{doc.name}</p>
                                        <p className="text-sm text-muted-foreground">{doc.size} - Uploaded on {doc.uploaded}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Download</Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button>Upload Document</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Task Checklist</CardTitle>
                        <CardDescription>Track completion of key activities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-3">
                            {rfpDetail.tasks.map(task => (
                                <li key={task.id} className="flex items-center gap-3">
                                    <CheckSquare className={`h-5 w-5 ${task.completed ? 'text-green-500' : 'text-muted-foreground'}`}/>
                                    <span className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.description}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button>Add Task</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
               <Card>
                    <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                        <CardDescription>A chronological history of events for this RFP.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                           {rfpDetail.history.map(item => (
                               <li key={item.id} className="flex items-start gap-4">
                                   <div className="mt-1.5 w-2 h-2 rounded-full bg-primary"></div>
                                   <div>
                                       <p className="font-medium">{item.event}</p>
                                       <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                                   </div>
                               </li>
                           ))}
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </main>

        <AppFooter />
      </div>
    </div>
  );
};

export default RFPDetailView;