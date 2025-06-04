import React from 'react';
import { appointments } from '../../data/appointments';
import AppointmentCard from './AppointmentCard';

const weekdays = ['MON 21', 'TUE 22', 'WED 23', 'THR 24', 'FRI 25'];

export default function CalendarView() {
  return (
    <div className="container-fluid bg-light py-3 calendar-container">
      <div className="row">
        <div className="col-md-1 text-end pe-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="py-3 text-muted small fw-semibold">
              {`${9 + i}:00`}
            </div>
          ))}
        </div>

        {weekdays.map((day, idx) => (
          <div className="col" key={idx}>
            <h6 className="text-center fw-bold text-secondary mb-3">{day}</h6>
            {appointments
              .filter((appt) => day.startsWith(appt.day))
              .map((appt) => (
                <AppointmentCard key={appt.id} appt={appt} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
