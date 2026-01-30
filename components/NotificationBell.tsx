"use client";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "@/actions/notifications";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Simple type since we can't import Prisma types easily on client without generation
interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: string;
  link: string | null;
  createdAt: Date;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifs = async () => {
    try {
        const data = await getNotifications();
        setNotifications(data);
        const unread = data.filter(n => !n.isRead).length;
        setUnreadCount(unread);
    } catch (e) {
        // Silently fail if not logged in
    }
  };

  useEffect(() => {
    fetchNotifs();
    // Poll every 30 seconds for new sales/purchases
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRead = async (n: Notification) => {
    if (!n.isRead) {
        await markAsRead(n.id);
        setUnreadCount(prev => Math.max(0, prev - 1));
        setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, isRead: true } : item));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition"
      >
        <Bell className="w-6 h-6 text-gray-300 hover:text-white" />
        {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-2 z-50 overflow-hidden"
            >
                <div className="px-4 py-3 border-b border-gray-800 bg-black/50">
                    <h3 className="font-bold text-white text-sm">Notifications</h3>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No notifications yet.
                        </div>
                    ) : (
                        notifications.map(n => (
                            <Link 
                                key={n.id}
                                href={n.link || '#'}
                                onClick={() => handleRead(n)}
                                className={`block p-4 border-b border-gray-800 last:border-0 hover:bg-white/5 transition ${!n.isRead ? 'bg-purple-900/10' : ''}`}
                            >
                                <div className="flex gap-3">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!n.isRead ? 'bg-purple-500' : 'bg-transparent'}`} />
                                    <div>
                                        <p className="font-bold text-sm text-white">{n.title}</p>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{n.message}</p>
                                        <p className="text-[10px] text-gray-600 mt-2">{new Date(n.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
