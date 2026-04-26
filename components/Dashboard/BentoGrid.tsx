import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Activity, CreditCard, DollarSign, Eye, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface BentoGridProps {
  totalRevenue: number;
  totalSales: number;
  totalViews: number;
  revenueChange?: number;  // percentage vs previous period, positive = up
  salesChange?: number;
  viewsChange?: number;
}

function TrendBadge({ change }: { change?: number }) {
  if (change == null) return null;
  const isUp = change > 0;
  const isFlat = change === 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
        isFlat ? "text-zinc-500" : isUp ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      {isFlat ? (
        <Minus className="w-3 h-3" />
      ) : isUp ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      {isFlat ? "No change" : `${isUp ? "+" : ""}${change.toFixed(1)}% vs last period`}
    </span>
  );
}

export function BentoGrid({
  totalRevenue,
  totalSales,
  totalViews,
  revenueChange,
  salesChange,
  viewsChange,
}: BentoGridProps) {
  const cards = [
    {
      title: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      change: revenueChange,
    },
    {
      title: "Total Sales",
      value: `+${totalSales}`,
      icon: CreditCard,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10 border-cyan-500/20",
      change: salesChange,
    },
    {
      title: "Product Views",
      value: `+${totalViews.toLocaleString()}`,
      icon: Eye,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10 border-blue-500/20",
      change: viewsChange,
    },
    {
      title: "Avg. Order Value",
      value: totalSales > 0 ? formatPrice(Math.round(totalRevenue / totalSales)) : "$—",
      icon: Activity,
      iconColor: "text-pink-400",
      iconBg: "bg-pink-500/10 border-pink-500/20",
      change: undefined,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, value, icon: Icon, iconColor, iconBg, change }) => (
        <Card
          key={title}
          className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-200 group"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${iconBg}`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
            <TrendBadge change={change} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
