import React, { useState } from 'react';
import {
  Sidebar,
  Header,
  CalendarView,
  AppointmentList,
} from '../components/AppointmentPage';

export default function AppointmentPage() {
  const [view, setView] = useState('calendar');

  return (
    <div className="d-flex">
      <Sidebar onToggleView={setView} activeView={view} />
      <div className="flex-grow-1">
        <Header />
        {view === 'calendar' ? <CalendarView /> : <AppointmentList />}
      </div>
    </div>
  );
}
