import React from 'react';
import { appointments } from '../data/appointments';
import AppointmentCard from './AppointmentCard';

const days = ['MON 21', 'TUE 22', 'WED 23', 'THR 24', 'FRI 25'];

const CalendarView = () => {
  return (
    <div className="d-flex px-4 mt-4" style={{ overflowX: 'auto' }}>
      {days.map(day => (
        <div key={day} className="me-3" style={{ minWidth: '200px' }}>
          <h6 className="text-center">{day}</h6>
          {appointments
            .filter(appt => appt.day === day)
            .map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
