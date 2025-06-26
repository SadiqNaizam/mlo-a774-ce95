import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data and config to make the component self-contained for previews
const defaultChartData = [
  { stage: "New", value: 12 },
  { stage: "Discovery", value: 19 },
  { stage: "Proposal", value: 8 },
  { stage: "Negotiation", value: 5 },
  { stage: "Won", value: 3 },
  { stage: "Lost", value: 4 },
];

const defaultChartConfig = {
  value: {
    label: "RFPs",
    color: "hsl(var(--chart-1))",
  },
};

// This is the custom shape component for the bars, wrapped with framer-motion.
// Recharts passes props like x, y, width, height to this component for each bar.
const AnimatedBar = (props: any) => {
  const { x, y, width, height, fill } = props;

  const barVariants: Variants = {
    hidden: {
      scaleY: 0,
    },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      variants={barVariants}
      // The transform origin is set to the bottom of the bar for the "grow up" effect.
      style={{ transformOrigin: 'bottom' }}
    />
  );
};

// Props for the main AnimatedChart component
interface AnimatedChartProps {
  data?: any[];
  config?: any;
  className?: string;
  chartTitle?: string;
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({
  data = defaultChartData,
  config = defaultChartConfig,
  className,
  chartTitle = "RFP Stage Distribution"
}) => {
  console.log('AnimatedChart loaded');

  // Framer Motion variants for the container to orchestrate the animation of its children.
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // This creates the delay between each bar's animation.
      },
    },
  };

  const dataKey = Object.keys(config)[0];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          {/* We wrap the ResponsiveContainer in a motion.div to control the animation sequence */}
          <motion.div
            className="w-full h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="stage"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey={dataKey}
                  fill={config[dataKey]?.color || "hsl(var(--chart-1))"}
                  radius={4}
                  // Here we pass our custom animated component to the 'shape' prop.
                  // Recharts will use this component to render each bar.
                  shape={<AnimatedBar />}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnimatedChart;