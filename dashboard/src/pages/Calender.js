import React, { useState, useEffect } from "react";

import { Card } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react"; // => request placed at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

import axios from "axios";
import { API_SERVICE } from "../config/URI";

const Calender = () => {
  const [eventList, setEventList] = useState([]);

  const clientFor = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  useEffect(() => {
    axios
      .get(`${API_SERVICE}/api/v1/main/getallappointments/${clientFor}`)
      .then((res) => {
        setEventList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card>
      <h3>Welcome {userName}</h3>
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          initialView="listWeek"
          weekends={false}
          events={eventList}
          height={720}
        />
      </div>
    </Card>
  );
};

export default Calender;
