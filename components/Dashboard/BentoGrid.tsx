import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

interface BentoGridProps {
  totalRevenue: number;
  totalSales: number;
  totalViews: number; // Placeholder for now
}

export function BentoGrid({ totalRevenue, totalSales, totalViews }: BentoGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatPrice(totalRevenue)}</div>
          <p className="text-xs text-zinc-500">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Sales
          </CardTitle>
          <CreditCard className="h-4 w-4 text-cyan-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">+{totalSales}</div>
          <p className="text-xs text-zinc-500">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Active Now
          </CardTitle>
          <Activity className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">+573</div>
          <p className="text-xs text-zinc-500">+201 since last hour</p>
        </CardContent>
      </Card>
         <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Views
          </CardTitle>
          <Users className="h-4 w-4 text-pink-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">+{totalViews}</div>
          <p className="text-xs text-zinc-500">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
