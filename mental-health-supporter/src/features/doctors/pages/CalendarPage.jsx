import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const defaultEvents = [];

export default function CalendarPage() {
  const [events, setEvents] = useState(defaultEvents);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setShowModal(true);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;
    setEvents([...events, { ...newEvent }]);
    setShowModal(false);
    setNewEvent({ title: '', start: '', end: '' });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#fafbfc' }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: '#fff', borderRight: '1px solid #eee', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>January</h3>
          {/* Mini calendar placeholder */}
          <div style={{ marginBottom: 32 }}>
            <Calendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 220 }}
              views={['month']}
              toolbar={false}
              selectable={false}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <h5 style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Upcoming events</h5>
            {events.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#aaa', fontSize: 14 }}>
                <span role="img" aria-label="party">🎉</span>
                <div>No upcoming events</div>
              </div>
            ) : (
              <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {events.slice(0, 3).map((event, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    <span style={{ fontWeight: 500 }}>{event.title}</span><br />
                    <span style={{ fontSize: 12, color: '#888' }}>{format(event.start, 'PPpp')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Main calendar */}
      <div style={{ flex: 1, padding: 32, background: '#fafbfc' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0, flex: 1 }}>01-07 January 2022</h2>
          <button
            style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
            onClick={() => setShowModal(true)}
          >
            Add event <span style={{ fontWeight: 700, fontSize: 18, marginLeft: 4 }}>+</span>
          </button>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 120px)', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}
          defaultView={Views.WEEK}
          views={['week']}
          selectable
          onSelectSlot={handleSelectSlot}
          popup
        />
      </div>
      {/* Modal for adding event */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0006', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleAddEvent} style={{ background: '#fff', padding: 32, borderRadius: 10, minWidth: 320, boxShadow: '0 2px 16px #0002' }}>
            <h4 style={{ marginBottom: 18 }}>Add Event</h4>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                style={{ width: '100%', padding: 8, borderRadius: 5, border: '1px solid #ddd' }}
                required
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>Start</label>
              <input
                type="datetime-local"
                value={newEvent.start ? format(newEvent.start, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={e => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                style={{ width: '100%', padding: 8, borderRadius: 5, border: '1px solid #ddd' }}
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>End</label>
              <input
                type="datetime-local"
                value={newEvent.end ? format(newEvent.end, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={e => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                style={{ width: '100%', padding: 8, borderRadius: 5, border: '1px solid #ddd' }}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ background: '#eee', border: 'none', borderRadius: 5, padding: '8px 18px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
