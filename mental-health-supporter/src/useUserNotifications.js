import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function useUserNotifications(userId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;
    // Fetch all notifications for the user
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (!error && data) setNotifications(data);
    };
    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications-navbar')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return notifications;
}

export default useUserNotifications;
