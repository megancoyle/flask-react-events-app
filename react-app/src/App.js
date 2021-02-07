import React, { useState, useEffect } from 'react';
import axios from "axios";
import EventTable from "./components/EventTable";

const App = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
      '/events'
    );
    setEvents(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <EventTable events={events}/>
    </div>
  );
};
  
export default App;
