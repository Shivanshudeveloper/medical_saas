import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { API_SERVICE } from "src/config/URI";

import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Notes() {
  const classes = useStyles();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userNotes, setUserNotes] = useState([]);
  const [userNotesId, setUserNotesId] = useState();
  const [userNotesL, setUserNotesL] = useState(true);

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    axios
      .get(`${API_SERVICE}/api/v1/main/getallusers/${userId}`)
      .then((res) => {
        setCustomers(res.data.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  return (
    <div style={{ padding: "2%" }}>
      {loading === true ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h4>Full Name</h4>
                </TableCell>
                <TableCell align="right">
                  <h4>Email&nbsp;</h4>
                </TableCell>
                <TableCell align="right">
                  <h4>Progress Notes&nbsp;</h4>
                </TableCell>
                <TableCell align="right">
                  <h4>Treatment Plan&nbsp;</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell component="th" scope="row">
                    <h6>{customer.name}</h6>
                  </TableCell>
                  <TableCell align="right">
                    <h6>{customer.email}</h6>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      href={`singlenote?id=${customer._id}`}
                      variant="contained"
                      color="primary"
                    >
                      See more
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      href={`singletreatment?id=${customer._id}`}
                      variant="contained"
                      color="primary"
                    >
                      See more
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
