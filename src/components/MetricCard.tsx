import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define a type for the Icon component
type IconType = React.ElementType;

export interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  trend?: number; // e.g., 12.5 for +12.5% or -5.2 for -5.2%
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, icon: Icon, trend }) => {
  console.log('MetricCard loaded for:', title);

  const trendIsPositive = trend !== undefined && trend >= 0;

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        {trend !== undefined && (
          <div className="mt-2 flex items-center space-x-1 text-sm">
            {trendIsPositive ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
            <span className={cn(
              "font-semibold",
              trendIsPositive ? "text-green-600" : "text-red-600"
            )}>
              {Math.abs(trend)}%
            </span>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;