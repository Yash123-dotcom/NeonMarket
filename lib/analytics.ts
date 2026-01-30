import { prisma } from "@/lib/db";
import { startOfDay, subDays, format } from "date-fns";

export async function getDashboardAnalytics(userId: string) {
  // 1. Get total revenue & sales from Analytics table (Pre-aggregated)
  const totalStats = await prisma.analytics.aggregate({
    where: { userId },
    _sum: {
      revenue: true,
      sales: true,
      views: true,
    },
  });

  // 2. Get last 7 days chart data
  const sevenDaysAgo = subDays(startOfDay(new Date()), 7);
  
  const dailyRecords = await prisma.analytics.findMany({
    where: {
      userId,
      date: {
        gte: sevenDaysAgo,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  // Fill in missing days with 0
  const chartData = [];
  for (let i = 0; i <= 7; i++) {
    const d = subDays(new Date(), 7 - i);
    const dateKey = startOfDay(d).toISOString();
    const formattedDate = format(d, "MMM dd");

    const record = dailyRecords.find(r => startOfDay(r.date).toISOString() === dateKey);

    chartData.push({
      date: formattedDate,
      revenue: (record?.revenue || 0) / 100, // Convert to dollars for chart
      sales: record?.sales || 0,
    });
  }

  return {
    totalRevenue: (totalStats._sum.revenue || 0),
    totalSales: (totalStats._sum.sales || 0),
    totalViews: (totalStats._sum.views || 0),
    chartData,
  };
}
