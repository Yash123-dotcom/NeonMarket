"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueChartProps {
  data: {
    date: string;
    revenue: number;
    sales: number;
  }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    if(!data || data.length === 0) {
        return (
            <Card className="col-span-4 border-zinc-800 bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="text-white">Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center text-zinc-500">
                  No data available yet.
              </CardContent>
            </Card>
        )
    }

  return (
    <Card className="col-span-4 border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-white">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#52525b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#52525b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
                contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
                labelStyle={{ color: "#a1a1aa" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
