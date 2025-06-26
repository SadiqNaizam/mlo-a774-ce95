import React, { useState } from 'react';

// Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';

// Page-specific Components
import MetricCard from '@/components/MetricCard';
import AnimatedChart from '@/components/AnimatedChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { Briefcase, Target, DollarSign, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  console.log('Dashboard page loaded');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleNewRfp = () => {
    // In a real application, this would trigger a modal or navigate to a new page.
    alert('The "New RFP" wizard would open now!');
  };

  // Sample data for the second chart
  const recentActivityData = [
    { month: 'Jan', submitted: 15, won: 8 },
    { month: 'Feb', submitted: 20, won: 12 },
    { month: 'Mar', submitted: 18, won: 10 },
    { month: 'Apr', submitted: 25, won: 15 },
  ];
  const recentActivityConfig = {
    submitted: { label: 'Submitted', color: 'hsl(var(--chart-1))' },
    won: { label: 'Won', color: 'hsl(var(--chart-2))' },
  };

  return (
    <div className="flex min-h-screen w-full">
      <CollapsibleSidebar isCollapsed={isSidebarCollapsed} onToggle={handleToggleSidebar} />
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <AppHeader onNewRfpClick={handleNewRfp} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid gap-6">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            {/* Metric Cards Section */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="Active RFPs"
                value="42"
                description="Currently in the pipeline"
                icon={Briefcase}
                trend={5.2}
              />
              <MetricCard
                title="Win Rate"
                value="68%"
                description="Based on last 30 proposals"
                icon={Target}
                trend={-1.5}
              />
              <MetricCard
                title="Total Pipeline Value"
                value="$2.1M"
                description="Value of all active RFPs"
                icon={DollarSign}
                trend={15.0}
              />
              <MetricCard
                title="Proposals Submitted"
                value="18"
                description="This month"
                icon={CheckCircle}
              />
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AnimatedChart
                chartTitle="RFP Funnel Overview"
                // Using default data from the component, but could be customized
              />
              <AnimatedChart
                chartTitle="Monthly Activity"
                data={recentActivityData}
                config={recentActivityConfig}
                // Overriding the default data and config for a different view
              />
            </section>
            
            {/* Additional content card */}
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">More dashboard widgets and reports can be added here for quick access.</p>
                    </CardContent>
                </Card>
            </section>
          </div>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default Dashboard;