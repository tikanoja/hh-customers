import { useState, useEffect, useRef } from 'react';
import { apiClient } from '../api/apiclient';
import { TrainingWithCustomer } from '../api/types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import '../calendar.css'; // custom styles for the calendar

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  extendedProps: {
    customer: string;
    duration: number;
  };
};

export const CalendarView = () => {
  const [trainings, setTrainings] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<string>('dayGridMonth');
  const calendarRef = useRef<any>(null);
  
  useEffect(() => {
    // start by fetching all trainings for the calendar
    apiClient.get<TrainingWithCustomer[]>('gettrainings')
      .then(res => {
        // transform data to match FullCalendars event format
        // and calculate end time based on duration
        const events = res.map(training => {
          const startTime = new Date(training.date);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + training.duration);
          
          const customerName = training.customer 
            ? `${training.customer.firstname} ${training.customer.lastname}`
            : 'Unknown Customer';
            
          return {
            id: training.id ? training.id.toString() : Math.random().toString(),
            title: `${training.activity} / ${customerName}`,
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            extendedProps: {
              customer: customerName,
              duration: training.duration
            }
          };
        });
        setTrainings(events);
      })
      .catch(err => console.error('Error fetching trainings for calendar:', err));
  }, []);

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setViewMode(newView);
      
      // we'll use the calendarRef to change the view!!
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(newView);
      }
    }
  };

  return (
    <div style={{ height: '100%', width: '100%', padding: '20px' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Training Calendar</Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="calendar view mode"
        >
          <ToggleButton value="dayGridMonth">Month</ToggleButton>
          <ToggleButton value="timeGridWeek">Week</ToggleButton>
          <ToggleButton value="timeGridDay">Day</ToggleButton>
          <ToggleButton value="listWeek">Agenda</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <div style={{ height: 'calc(100vh - 180px)' }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView={viewMode}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '' // no buttons on the right
          }}
          events={trainings}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          eventClassNames="training-event" // custom class for styling! check css
          eventContent={(eventInfo) => {
            return (
              <div className="training-event-content">
                <b>{eventInfo.timeText}</b>
                <br />
                <i>{eventInfo.event.title}</i>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};