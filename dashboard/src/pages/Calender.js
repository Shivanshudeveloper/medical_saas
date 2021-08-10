import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react"; // => request placed at the top
import { Card, Grid } from "@material-ui/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import TotalCustomers from "../components/dashboard/TotalCustomers";
import Appointments from "../components/dashboard/Appointments";

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

  function renderEventContent(eventInfo) {
    return (
      <a href={`/app/calender/${eventInfo.event.extendedProps._id}`}>
        <div>{eventInfo.event.title}</div>
      </a>
    );
  }

  return (
    <Card style={{ padding: "20px" }}>
      <h3>Welcome {userName}</h3>

      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalCustomers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Appointments />
        </Grid>
      </Grid>

      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          initialView="listWeek"
          weekends={false}
          events={eventList}
          height={720}
          eventContent={renderEventContent}
        />
      </div>
    </Card>
  );
};

export default Calender;
