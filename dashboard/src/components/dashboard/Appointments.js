import React, { useState, useEffect } from "react";

import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import { API_SERVICE } from "../../config/URI";

const Appointments = (props) => {
  const [eventList, setEventList] = useState(0);

  useEffect(() => {
    const clientFor = sessionStorage.getItem("userId");
    axios
      .get(`${API_SERVICE}/api/v1/main/getallappointments/${clientFor}`)
      .then((res) => {
        setEventList(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              APPOINTMENTS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {eventList}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Appointments;
