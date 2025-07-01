import React, { useState } from 'react';
import useSupabaseNotifications from './useSupabaseNotifications';

function NotificationComponent({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useSupabaseNotifications(userId, (data) => {
    setNotifications((prev) => [...prev, data]);
    // Optionally show a toast or alert here
  });

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationComponent;
