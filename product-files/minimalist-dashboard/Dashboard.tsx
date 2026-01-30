import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 12543,
    revenue: 89432,
    orders: 1234,
    growth: 23.5,
  });

  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#8884d8' },
    { name: 'Mobile', value: 300, color: '#82ca9d' },
    { name: 'Tablet', value: 200, color: '#ffc658' },
  ];

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          <p className='text-gray-600'>Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            title='Total Users'
            value={stats.totalUsers.toLocaleString()}
            change='+12%'
            positive={true}
            icon='👥'
          />
          <StatCard
            title='Revenue'
            value={`$${stats.revenue.toLocaleString()}`}
            change='+8%'
            positive={true}
            icon='💰'
          />
          <StatCard
            title='Orders'
            value={stats.orders.toLocaleString()}
            change='+23%'
            positive={true}
            icon='📦'
          />
          <StatCard
            title='Growth'
            value={`${stats.growth}%`}
            change='-2%'
            positive={false}
            icon='📈'
          />
        </div>

        {/* Charts Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* Sales Chart */}
          <div className='bg-white p-6 rounded-lg shadow-sm border'>
            <h3 className='text-lg font-semibold mb-4'>Sales Overview</h3>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='sales' fill='#3B82F6' />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Chart */}
          <div className='bg-white p-6 rounded-lg shadow-sm border'>
            <h3 className='text-lg font-semibold mb-4'>Revenue Trend</h3>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='revenue' stroke='#10B981' strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Device Usage */}
          <div className='bg-white p-6 rounded-lg shadow-sm border'>
            <h3 className='text-lg font-semibold mb-4'>Device Usage</h3>
            <ResponsiveContainer width='100%' height={200}>
              <PieChart>
                <Pie data={pieData} cx='50%' cy='50%' outerRadius={80} dataKey='value'>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className='bg-white p-6 rounded-lg shadow-sm border lg:col-span-2'>
            <h3 className='text-lg font-semibold mb-4'>Recent Activity</h3>
            <div className='space-y-4'>
              <ActivityItem
                user='John Doe'
                action='made a purchase'
                time='2 minutes ago'
                avatar='👤'
              />
              <ActivityItem
                user='Jane Smith'
                action='left a review'
                time='5 minutes ago'
                avatar='👩'
              />
              <ActivityItem
                user='Mike Johnson'
                action='signed up'
                time='10 minutes ago'
                avatar='👨'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, positive, icon }) => (
  <div className='bg-white p-6 rounded-lg shadow-sm border'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm font-medium text-gray-600'>{title}</p>
        <p className='text-2xl font-bold text-gray-900'>{value}</p>
      </div>
      <div className='text-2xl'>{icon}</div>
    </div>
    <div className='mt-2'>
      <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
      <span className='text-sm text-gray-600'> from last month</span>
    </div>
  </div>
);

const ActivityItem = ({ user, action, time, avatar }) => (
  <div className='flex items-center space-x-3'>
    <div className='text-lg'>{avatar}</div>
    <div className='flex-1'>
      <p className='text-sm'>
        <span className='font-medium text-gray-900'>{user}</span>
        <span className='text-gray-600'> {action}</span>
      </p>
      <p className='text-xs text-gray-500'>{time}</p>
    </div>
  </div>
);

export default Dashboard;
