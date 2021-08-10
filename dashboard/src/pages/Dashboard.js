import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";
import { Box, Container, Grid, Card } from "@material-ui/core";
import Budget from "src/components/dashboard/Appointments";
import TotalCustomers from "src/components/dashboard//TotalCustomers";

import FullCalendar from "@fullcalendar/react"; // => request placed at the top
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

import axios from "axios";
import { API_SERVICE } from "../config/URI";

const Dashboard = () => {
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
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Budget />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers />
            </Grid>
          </Grid>
          <Card style={{ marginTop: "30px" }}>
            <div style={{ maxWidth: "100%", margin: "20px auto" }}>
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
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
