import React, { useState } from 'react';

// Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';

// Custom Components
import AnimatedChart from '@/components/AnimatedChart';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Recharts for additional chart types
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '@/lib/utils';

// Placeholder data for additional charts to showcase variety
const cycleTimeData = [
  { month: 'Jan', days: 25 },
  { month: 'Feb', days: 22 },
  { month: 'Mar', days: 28 },
  { month: 'Apr', days: 26 },
  { month: 'May', days: 30 },
  { month: 'Jun', days: 24 },
];

const winLossData = [
    { stage: 'Q1', won: 15, lost: 5 },
    { stage: 'Q2', won: 20, lost: 8 },
    { stage: 'Q3', won: 25, lost: 10 },
    { stage: 'Q4', won: 22, lost: 7 },
];

// Config for the second AnimatedChart instance
const winLossConfig = {
    won: { label: "Won", color: "hsl(var(--chart-2))" },
    lost: { label: "Lost", color: "hsl(var(--chart-5))" }
};


const Analytics = () => {
  console.log('Analytics page loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNewRfp = () => {
    console.log("Trigger 'New RFP' wizard from Analytics page");
    // In a real app, this would likely open a dialog/modal form
  };

  return (
    <div className="flex min-h-screen w-full">
      <CollapsibleSidebar isCollapsed={isCollapsed} onToggle={handleToggleSidebar} />
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <AppHeader onNewRfpClick={handleNewRfp} />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 overflow-y-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">Analytics & Reporting</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button>Apply</Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="flex-1">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
              <TabsTrigger value="overview">Performance Overview</TabsTrigger>
              <TabsTrigger value="cycle">Cycle Time Analysis</TabsTrigger>
              <TabsTrigger value="winloss">Win/Loss Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4 space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total RFPs Submitted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45%</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Deal Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$75,320</div>
                    <p className="text-xs text-muted-foreground">-5% from last month</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active RFPs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-muted-foreground">currently in pipeline</p>
                  </CardContent>
                </Card>
              </div>
              <AnimatedChart chartTitle="Current RFP Stage Distribution" />
            </TabsContent>

            <TabsContent value="cycle" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Average RFP Cycle Time (Days)</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] pl-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cycleTimeData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="days" name="Avg. Cycle Time" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="winloss" className="mt-4">
               <AnimatedChart 
                chartTitle="Quarterly Wins vs. Losses"
                data={winLossData}
                config={winLossConfig}
               />
            </TabsContent>
          </Tabs>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default Analytics;