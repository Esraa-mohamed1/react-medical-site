import { useEffect } from 'react';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';

function useSupabaseNotifications(userId, onNotification) {
  useEffect(() => {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        (payload) => {
          if (onNotification) onNotification(payload.new);
          if (payload?.new?.message) toast.info(payload.new.message);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onNotification]);
}

export default useSupabaseNotifications;
