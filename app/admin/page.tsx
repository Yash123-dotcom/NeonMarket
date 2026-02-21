import { connectDB } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Product } from '@/lib/models/Product';
import { clerkClient } from '@clerk/nextjs/server';
import { DollarSign, ShoppingBag, Users, ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();

  const [totalSales, totalProducts, revenueResult] = await Promise.all([
    Order.countDocuments(),
    Product.countDocuments(),
    Order.aggregate([{ $group: { _id: null, total: { $sum: '$pricePaidInCents' } } }]),
  ]);

  const revenue = ((revenueResult[0]?.total ?? 0) / 100);

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).lean();
  const client = await clerkClient();

  const enrichedOrders = await Promise.all(
    recentOrders.map(async (order) => {
      try {
        const user = await client.users.getUser(order.userId);
        return { ...order, id: order._id.toString(), userEmail: user.emailAddresses[0]?.emailAddress || 'No Email' };
      } catch {
        return { ...order, id: order._id.toString(), userEmail: 'Anonymous / Deleted User' };
      }
    })
  );

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-3xl font-black mb-8 text-white'>Command Center</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        <div className='bg-zinc-900/80 border border-white/10 p-6 rounded-2xl relative overflow-hidden group'>
          <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition'>
            <DollarSign className='w-24 h-24 text-green-500' />
          </div>
          <p className='text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1'>Total Revenue</p>
          <h3 className='text-4xl font-black text-white'>${revenue.toLocaleString()}</h3>
          <span className='text-green-400 text-xs font-bold flex items-center mt-2'>
            <ArrowUpRight className='w-3 h-3 mr-1' /> +12% this week
          </span>
        </div>
        <div className='bg-zinc-900/80 border border-white/10 p-6 rounded-2xl relative overflow-hidden group'>
          <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition'>
            <ShoppingBag className='w-24 h-24 text-purple-500' />
          </div>
          <p className='text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1'>Total Orders</p>
          <h3 className='text-4xl font-black text-white'>{totalSales}</h3>
        </div>
        <div className='bg-zinc-900/80 border border-white/10 p-6 rounded-2xl relative overflow-hidden group'>
          <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition'>
            <Users className='w-24 h-24 text-blue-500' />
          </div>
          <p className='text-zinc-400 text-sm font-bold uppercase tracking-wider mb-1'>Active Products</p>
          <h3 className='text-4xl font-black text-white'>{totalProducts}</h3>
        </div>
      </div>

      <h2 className='text-xl font-bold mb-6 text-white'>Recent Live Orders</h2>
      <div className='bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-white/5 text-zinc-400 text-xs uppercase font-bold'>
            <tr>
              <th className='p-4'>Customer Email</th>
              <th className='p-4'>Amount</th>
              <th className='p-4'>Status</th>
              <th className='p-4'>Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {enrichedOrders.length === 0 ? (
              <tr>
                <td colSpan={4} className='p-8 text-center text-zinc-500'>No orders yet.</td>
              </tr>
            ) : (
              enrichedOrders.map((order) => (
                <tr key={order.id} className='hover:bg-white/5 transition'>
                  <td className='p-4 font-medium text-white'>
                    {order.userEmail}
                    <br />
                    <span className='text-xs text-zinc-500'>ID: {order.userId.slice(0, 10)}...</span>
                  </td>
                  <td className='p-4 text-green-400 font-bold'>
                    ${(order.pricePaidInCents / 100).toFixed(2)}
                  </td>
                  <td className='p-4'>
                    <span className='bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold'>Paid</span>
                  </td>
                  <td className='p-4 text-zinc-500 text-sm'>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
