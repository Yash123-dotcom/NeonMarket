import { connectDB } from "@/lib/db";
import { Analytics } from "@/lib/models/Analytics";
import { startOfDay, subDays, format } from "date-fns";

export async function getDashboardAnalytics(userId: string) {
  await connectDB();

  // Aggregate totals
  const totalStats = await Analytics.aggregate([
    { $match: { userId } },
    { $group: { _id: null, revenue: { $sum: "$revenue" }, sales: { $sum: "$sales" }, views: { $sum: "$views" } } },
  ]);

  const stats = totalStats[0] || { revenue: 0, sales: 0, views: 0 };

  // Last 7 days records
  const sevenDaysAgo = subDays(startOfDay(new Date()), 7);

  const dailyRecords = await Analytics.find({
    userId,
    date: { $gte: sevenDaysAgo },
  }).sort({ date: 1 }).lean();

  // Fill missing days with 0
  const chartData = [];
  for (let i = 0; i <= 7; i++) {
    const d = subDays(new Date(), 7 - i);
    const dateKey = startOfDay(d).toISOString();
    const formattedDate = format(d, "MMM dd");

    const record = dailyRecords.find((r) => startOfDay(r.date).toISOString() === dateKey);

    chartData.push({
      date: formattedDate,
      revenue: (record?.revenue || 0) / 100,
      sales: record?.sales || 0,
    });
  }

  return {
    totalRevenue: stats.revenue,
    totalSales: stats.sales,
    totalViews: stats.views,
    chartData,
  };
}
