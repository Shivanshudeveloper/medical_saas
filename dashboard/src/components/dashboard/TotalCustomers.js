import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import axios from "axios";
import { API_SERVICE } from "../../config/URI";

const TotalCustomers = (props) => {
  const [customers, setCustomers] = useState(0);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    axios
      .get(`${API_SERVICE}/api/v1/main/getallusers/${userId}`)
      .then((res) => {
        setCustomers(res.data.data.length);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL CLIENTS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {customers}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalCustomers;
