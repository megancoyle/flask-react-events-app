import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EventTable from './components/EventTable';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [results, setResults] = useState(true);
  const [date, setDate] = useState('');
  const [events, setEvents] = useState('');
  const [eventData, setEventData] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    axios.get('/events').then(response => {
      setEvents(response.data);
      setLoading(false);
      setEventData(response.data);
    })
  }, []);

  if (isLoading) {
    return <div className='App'>Loading...</div>;
  }

  const handleDateChange = () => {
    setEvents(eventData);
    const day0fTheWeek = moment(date).format('dddd');
    const reformattedDate = day0fTheWeek + ', ' + moment(date).format('LL');
    if (date !== '') {
      if (events.filter(item => item.event_date === reformattedDate).length > 0) {
        setEvents(events.filter(item => item.event_date === reformattedDate));
        setResults(true);
      } else {
      setResults(false);
      }
    }
  }

  const handleStartTimeChange = () => {
    if (startTime && startTime !== '') {
      if (events.filter(item => moment(item.check_in_from, 'h:mm:ss A').format('HH:mm') >= startTime).length > 0) {
        setEvents(events.filter(item => moment(item.check_in_from, 'h:mm:ss A').format('HH:mm') >= startTime));
        setResults(true);
      } else {
      setResults(false);
      }
    }
  }

  const handleEndTimeChange = () => {
    if (endTime && endTime !== '') {
      if (events.filter(item => moment(item.check_in_to, 'h:mm:ss A').format('HH:mm') <= endTime).length > 0) {
        setEvents(events.filter(item => moment(item.check_in_to, 'h:mm:ss A').format('HH:mm') <= endTime));
        setResults(true);
      } else {
      setResults(false);
      }
    }
  }

  return (
    <div className='App'>
      <form className={classes.container} noValidate>
        <TextField
          id='date'
          label='Find Events on a Date'
          type='date'
          defaultValue=''
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setDate(e.target.value);
            handleDateChange();
          }}
        />
        <TextField
          id='time'
          label='Starting at'
          type='time'
          defaultValue=''
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          onChange={(e) => {
            setStartTime(e.target.value);
            handleStartTimeChange();
          }}
        />
        <TextField
          id='time_end'
          label='Starting no later than'
          type='time'
          defaultValue=''
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          onChange={(e) => {
            setEndTime(e.target.value);
            handleEndTimeChange();
          }}
        />
      </form>
      {results ? (
          <EventTable events={events}/>
        ) : (
          <>
            There are no results that match your search.
          </>
        )
      }
    </div>
  );
};
  
export default App;
