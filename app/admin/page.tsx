import { prisma } from '@/lib/db';
import { clerkClient } from '@clerk/nextjs/server';
import { DollarSign, ShoppingBag, Users, ArrowUpRight } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Fetch Data
  const totalSales = await prisma.order.count();
  const totalProducts = await prisma.product.count();

  // Calculate Revenue
  const totalRevenueCents = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
  });
  const revenue = (totalRevenueCents._sum.pricePaidInCents || 0) / 100;

  // 2. Fetch Recent Orders (Without the relation)
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  // 3. Get Real User Emails from Clerk
  // We map over the orders and ask Clerk: "Who is this userId?"
  const client = await clerkClient();

  const enrichedOrders = await Promise.all(
    recentOrders.map(async (order) => {
      try {
        const user = await client.users.getUser(order.userId);
        return {
          ...order,
          userEmail: user.emailAddresses[0]?.emailAddress || 'No Email',
        };
      } catch (error) {
        return { ...order, userEmail: 'Anonymous / Deleted User' };
      }
    })
  );

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-3xl font-black mb-8'>Command Center</h1>

      {/* STATS GRID */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        {/* Card 1: Revenue */}
        <div className='bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group'>
          <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition'>
            <DollarSign className='w-24 h-24 text-green-500' />
          </div>
          <p className='text-gray-400 text-sm font-bold uppercase tracking-wider mb-1'>
            Total Revenue
          </p>
          <h3 className='text-4xl font-black text-white'>${revenue.toLocaleString()}</h3>
          <span className='text-green-500 text-xs font-bold flex items-center mt-2'>
            <ArrowUpRight className='w-3 h-3 mr-1' /> +12% this week
          </span>
        </div>

        {/* Card 2: Sales */}
        <div className='bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group'>
          <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition'>
            <ShoppingBag className='w-24 h-24 text-purple-500' />
          </div>
          <p className='text-gray-400 text-sm font-bold uppercase tracking-wider mb-1'>
            Total Orders
          </p>
          <h3 className='text-4xl font-black text-white'>{totalSales}</h3>
        </div>

        {/* Card 3: Products */}
        <div className='bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group'>
          <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition'>
            <Users className='w-24 h-24 text-blue-500' />
          </div>
          <p className='text-gray-400 text-sm font-bold uppercase tracking-wider mb-1'>
            Active Products
          </p>
          <h3 className='text-4xl font-black text-white'>{totalProducts}</h3>
        </div>
      </div>

      {/* RECENT ORDERS TABLE */}
      <h2 className='text-xl font-bold mb-6'>Recent Live Orders</h2>
      <div className='bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-gray-800/50 text-gray-400 text-xs uppercase font-bold'>
            <tr>
              <th className='p-4'>Customer Email</th>
              <th className='p-4'>Amount</th>
              <th className='p-4'>Status</th>
              <th className='p-4'>Date</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-800'>
            {enrichedOrders.length === 0 ? (
              <tr>
                <td colSpan={4} className='p-8 text-center text-gray-500'>
                  No orders yet.
                </td>
              </tr>
            ) : (
              enrichedOrders.map((order) => (
                <tr key={order.id} className='hover:bg-white/5 transition'>
                  <td className='p-4 font-medium text-white'>
                    {order.userEmail}
                    <br />
                    <span className='text-xs text-gray-500'>
                      ID: {order.userId.slice(0, 10)}...
                    </span>
                  </td>
                  <td className='p-4 text-green-400 font-bold'>
                    ${(order.pricePaidInCents / 100).toFixed(2)}
                  </td>
                  <td className='p-4'>
                    <span className='bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold'>
                      Paid
                    </span>
                  </td>
                  <td className='p-4 text-gray-500 text-sm'>
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
