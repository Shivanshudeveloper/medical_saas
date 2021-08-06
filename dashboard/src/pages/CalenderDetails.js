import React, { useState, useEffect } from "react";

import { Card } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";

import axios from "axios";
import { API_SERVICE } from "../config/URI";
import { useParams } from "react-router-dom";

const CalenderDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  console.log(event);
  const userName = sessionStorage.getItem("userName");
  const apptDetails = [
    { title: "Appointment For", data: userName },
    { title: "Appointment By", data: event[0]?.apptFor?.split(" for ")[1] },
    { title: "Appointment Title", data: event[0]?.title },
    { title: "Appointment Date", data: event[0]?.date?.split("T")[0] },
    { title: "Appointment Time", data: event[0]?.date?.split("T")[1] },
  ];

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/api/v1/main/getoneappointment/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card style={{ height: "100%", padding: "20px" }}>
      <h3>Welcome {userName}</h3>
      <hr />
      <div
        style={{
          maxWidth: "90%",
          minHeight: "100%",
          margin: "30px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4>Appointment Details</h4>
        <TableContainer component={Paper} style={{ maxWidth: "60%" }}>
          <Table>
            <TableBody>
              {apptDetails.map((det) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {det.title}
                  </TableCell>
                  <TableCell align="right">{det.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <a href={`/app/profile?id=${event[0]?.userId}`}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px 0",
                cursor: "pointer",
              }}
            >
              View Customer
            </div>
          </a>
        </TableContainer>
      </div>
    </Card>
  );
};

export default CalenderDetails;
