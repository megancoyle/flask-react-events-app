import React from "react";

const EventTable = (props) => {
  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Check in</th>
              <th>Location</th>
              <th>Qualifications</th>
            </tr>
          </thead>
          <tbody>
          {props.events &&
            props.events.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.event_title}</td>
                  <td>{item.event_date}</td>
                  <td>{item.check_in_from}</td>
                  <td>{item.location}</td>
                  <td>{item.qualifications}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EventTable;
