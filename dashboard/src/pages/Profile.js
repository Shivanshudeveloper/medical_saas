import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Grid,
  Card,
  CardHeader,
  TextField,
  Divider,
  CardContent,
  Button,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { useState, useEffect } from "react";
import moment from "moment";

import queryString from "query-string";
import axios from "axios";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import Paper from "@material-ui/core/Paper";
import { Avatar, Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import renderHTML from "react-render-html";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { API_SERVICE } from "../config/URI";

const useStyles = makeStyles((theme) => ({
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

const Profile = () => {
  const classes = useStyles();
  const [openNotes, setOpenNotes] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpenNotes(true);
  };
  const handleClose = () => {
    setOpenNotes(false);
    setsteps(1);
  };

  const handleClickSnackBar = () => {
    setOpen(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [user, setUser] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [userModaNote, setUserModalNote] = useState([]);

  const handleClickOpenNotesModal = (note_) => {
    setUserModalNote(note_);
    setOpenNotesModal(true);
  };

  const handleCloseNotesModal = () => {
    setOpenNotesModal(false);
  };

  useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    // console.log(id);
    axios.get(`${API_SERVICE}/api/v1/main/getuser/${id}`).then((res) => {
      setUser(res.data[0]);
    });
  }, []);

  useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    // console.log(id);
    axios.get(`${API_SERVICE}/api/v1/main/getusernotes/${id}`).then((res) => {
      setUserNotes(res.data);
      // console.log(res.data);
    });
  }, []);

  const Img = ({ user }) => {
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user.image}
              sx={{
                height: 100,
                width: 100,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h3">
              {user.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {user.location}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const Fun = ({ user }) => {
    const [userData, setUserData] = useState(user);

    const editDetails = async () => {
      try {
        await axios
          .patch(
            `${API_SERVICE}/api/v1/main/updateuser/${userData._id}`,
            userData
          )
          .then((res) => {
            setUser(res.data);
            handleClickSnackBar();
          });
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="First name"
                name="firstName"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
                value={userData.name}
                variant="outlined"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Email Address"
                name="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
                value={userData?.email}
                variant="outlined"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Phone Number"
                name="phone"
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                // type="number"
                value={userData?.phone}
                variant="outlined"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Location"
                name="country"
                onChange={(e) =>
                  setUserData({ ...userData, location: e.target.value })
                }
                required
                value={userData?.location}
                variant="outlined"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Registeration Date"
                onChange={(e) =>
                  setUserData({ ...userData, regDate: e.target.value })
                }
                required
                type={isEditing && "date"}
                defaultValue={moment(userData?.regDate).format("DD/MM/YYYY")}
                // value={moment(userData?.regDate).format("DD/MM/YYYY")}
                variant="outlined"
                disabled={!isEditing}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography>
                <h3>Description</h3>
                <p>{userData?.description}</p>
              </Typography>
            </Grid>
          </Grid>
          {isEditing && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              onClick={editDetails}
            >
              Save Details
            </Button>
          )}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            color={isEditing ? "secondary" : "primary"}
            style={{ marginTop: "10px" }}
            onClick={() => {
              setIsEditing((e) => !e);
            }}
          >
            {!isEditing ? "Edit Details" : "Cancel"}
          </Button>

          <Button
            size="large"
            style={{ marginTop: "10px" }}
            fullWidth
            color="primary"
            onClick={handleClickOpen_}
          >
            View Treatment Plan
          </Button>

          <Dialog
            fullScreen
            open={open_}
            onClose={handleClose_}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Treatment Plan
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose_}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div>
              {treatment_ === undefined ? (
                <div></div>
              ) : (
                <Container maxWidth="lg">
                  <br />
                  <br />
                  <br />
                  <br />
                  <h4>Patient's Treatment Plan</h4>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        placeholder="Description"
                        variant="outlined"
                        name="desc"
                        value={treatment_.desc}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-basic"
                        fullWidth
                        placeholder="Diagnostic justification and/or assessment measures"
                        variant="outlined"
                        name="justification"
                        value={treatment_.justification}
                      />
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <TextField
                        id="outlined-basic"
                        multiline
                        rows={5}
                        fullWidth
                        placeholder="Presenting Problem"
                        variant="outlined"
                        name="problem"
                        value={treatment_.problem}
                      />
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <TextField
                        id="outlined-basic"
                        multiline
                        rows={5}
                        fullWidth
                        placeholder="Treatment Goals"
                        variant="outlined"
                        name="goals"
                        value={treatment_.goals}
                      />
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <InputLabel id="demo-simple-select-label">
                        Estimated Completion
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="estComp1"
                        value={treatment_.estComp1}
                      >
                        <MenuItem value="1 Week">1 Week</MenuItem>
                        <MenuItem value="2 Weeks">2 Weeks</MenuItem>
                        <MenuItem value="3 Weeks">3 Weeks</MenuItem>
                        <MenuItem value="1 Month">1 Month</MenuItem>
                        <MenuItem value="2 Months">2 Months</MenuItem>
                        <MenuItem value="3 Months">3 Months</MenuItem>
                        <MenuItem value="4 Months">4 Months</MenuItem>
                        <MenuItem value="5 Months">5 Months</MenuItem>
                        <MenuItem value="6 Months">6 Months</MenuItem>
                        <MenuItem value="7 Months">7 Months</MenuItem>
                        <MenuItem value="8 Months">8 Months</MenuItem>
                        <MenuItem value="9 Months">9 Months</MenuItem>
                        <MenuItem value="10 Months">10 Months</MenuItem>
                        <MenuItem value="11 Months">11 Months</MenuItem>
                        <MenuItem value="12 Months">12 Months</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <TextField
                        id="outlined-basic"
                        multiline
                        rows={5}
                        fullWidth
                        placeholder="Objective"
                        variant="outlined"
                        name="obj"
                        value={treatment_.obj}
                      />
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <TextField
                        id="outlined-basic"
                        multiline
                        rows={5}
                        fullWidth
                        placeholder="Treatment Strategy / Interventions"
                        variant="outlined"
                        name="strat"
                        value={treatment_.strat}
                      />
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <InputLabel id="demo-simple-select-label">
                        Estimated Completion
                      </InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="estComp2"
                        value={treatment_.estComp2}
                      >
                        <MenuItem value="1 Week">1 Week</MenuItem>
                        <MenuItem value="2 Weeks">2 Weeks</MenuItem>
                        <MenuItem value="3 Weeks">3 Weeks</MenuItem>
                        <MenuItem value="1 Month">1 Month</MenuItem>
                        <MenuItem value="2 Months">2 Months</MenuItem>
                        <MenuItem value="3 Months">3 Months</MenuItem>
                        <MenuItem value="4 Months">4 Months</MenuItem>
                        <MenuItem value="5 Months">5 Months</MenuItem>
                        <MenuItem value="6 Months">6 Months</MenuItem>
                        <MenuItem value="7 Months">7 Months</MenuItem>
                        <MenuItem value="8 Months">8 Months</MenuItem>
                        <MenuItem value="9 Months">9 Months</MenuItem>
                        <MenuItem value="10 Months">10 Months</MenuItem>
                        <MenuItem value="11 Months">11 Months</MenuItem>
                        <MenuItem value="12 Months">12 Months</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} mt={1} sm={12}>
                      <TextField
                        id="outlined-basic"
                        multiline
                        rows={5}
                        fullWidth
                        placeholder="Prescribed Frequency of Treatment"
                        variant="outlined"
                        name="freq"
                        value={treatment_.freq}
                      />
                    </Grid>
                  </Grid>
                  <br />

                  <Button
                    size="large"
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                    color="primary"
                    variant="outlined"
                    onClick={() => handleClose_()}
                  >
                    Back
                  </Button>
                </Container>
              )}
            </div>
          </Dialog>
        </CardContent>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
          message="User Updated"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackBar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Card>
    );
  };

  const sig_note = (data, idx) => {
    var temp_note = data.note.slice(0, 800);
    return (
      <>
        <Card className="mt-2">
          <CardHeader title={`Note ${idx + 1}`} />
          <CardContent>
            {renderHTML(temp_note)}
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleClickOpenNotesModal(data.note)}
            >
              View more
            </Button>
          </CardContent>
        </Card>
        <Dialog
          fullScreen
          open={openNotesModal}
          onClose={handleCloseNotesModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography
                id={`note${idx + 1}`}
                variant="h6"
                className={classes.title}
              >
                {`Note`}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseNotesModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: "10vh" }}>
            {renderHTML(String(userModaNote))}
          </Container>
        </Dialog>
      </>
    );
  };

  const [note, setNote] = useState("");
  const [steps, setsteps] = useState(1);

  const saveData = () => {
    let temp = {
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      phone: user.phone,
      regDate: user.regDate,
      description: user.description,
      image: user.image,
      note: note,
    };
    axios
      .post(`${API_SERVICE}/api/v1/main/addnote`, temp)
      .then((res) => {
        const { id } = queryString.parse(window.location.search);
        axios
          .get(`${API_SERVICE}/api/v1/main/getusernotes/${id}`)
          .then((res) => {
            setUserNotes(res.data);
          });
        handleClose();
        setNote("");
      })
      .catch((err) => {
        console.log(err);
      });

    setsteps(1);
  };

  const handleChangeEditor = (content, editor) => {
    setNote(content);
  };

  const [openSn, setOpenSn] = React.useState(false);

  const handleClickSn = () => {
    setOpenSn(true);
  };

  const handleCloseSn = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSn(false);
  };

  //Patient's Treatment Plan form data

  const [treatment, setTreatment] = useState({
    userId: "",
    desc: "",
    justification: "",
    problem: "",
    goals: "",
    estComp1: "",
    obj: "",
    strat: "",
    estComp2: "",
    freq: "",
  });

  const [treatment_, setTreatment_] = useState([]);

  const [open_, setOpen_] = useState(false);

  const handleClickOpen_ = () => {
    setOpen_(true);
  };

  const handleClose_ = () => {
    setOpen_(false);
  };

  const changeEle = (event) => {
    const { name, value } = event.target;
    setTreatment((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
    // console.log(treatment);
  };

  useEffect(() => {
    const { id } = queryString.parse(window.location.search);
    axios
      .get(`${API_SERVICE}/api/v1/main/gettreatment/${id}`)
      .then((res) => {
        setTreatment_(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const saveTreatment = ({}) => {
    const { id } = queryString.parse(window.location.search);
    treatment.userId = id;
    axios
      .post(`${API_SERVICE}/api/v1/main/addtreatment`, treatment)
      .then((res) => {
        handleClose();
        setOpenSn(true);
        axios
          .get(`${API_SERVICE}/api/v1/main/gettreatment/${id}`)
          .then((res) => {
            setTreatment_(res.data[0]);
          })
          .catch((err) => {
            console.log(err);
          });
        setTreatment({
          userId: "",
          desc: "",
          justification: "",
          problem: "",
          goals: "",
          estComp1: "",
          obj: "",
          strat: "",
          estComp2: "",
          freq: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    getApp();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventList, setEventList] = useState([]);

  const getApp = () => {
    const { id } = queryString.parse(window.location.search);
    axios
      .get(`${API_SERVICE}/api/v1/main/getappointments/${id}`)
      .then((res) => {
        console.log(res.data);
        setEventList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addAppointment = async () => {
    await axios
      .post(`${API_SERVICE}/api/v1/main/addappointment/${user._id}`, {
        eventName,
        eventDate,
      })
      .then(() => {
        setOpenDialog(false);
        setEventName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div
          style={{
            margin: "20px 30px 0 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Notes
          </Button>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpenDialog}
              style={{ marginLeft: "10px" }}
            >
              Book Appointment
            </Button>
            <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
              <AppBar>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleCloseDialog}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6">Book Appointment</Typography>
                  <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                    Save
                  </Button>
                </Toolbar>
              </AppBar>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "80%", maxHeight: "700px" }}>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={false}
                    events={eventList}
                    height={720}
                  />
                </div>
                <div
                  style={{ width: "20%", marginTop: "5rem", padding: "20px" }}
                >
                  <Typography variant="body1">
                    Book New Appointment for {user.name}
                  </Typography>
                  <TextField
                    label="Event"
                    variant="filled"
                    fullWidth
                    value={eventName}
                    onChange={(e) => {
                      setEventName(e.target.value);
                    }}
                    style={{ margin: "10px auto" }}
                  />

                  <TextField
                    id="datetime-local"
                    label="Appointment Date and Time"
                    variant="filled"
                    type="datetime-local"
                    defaultValue="2021-08-06T10:30"
                    fullWidth
                    style={{ margin: "10px auto" }}
                    onChange={(e) => setEventDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button
                    color="primary"
                    fullWidth
                    variant="contained"
                    style={{ margin: "10px auto" }}
                    onClick={addAppointment}
                  >
                    Book
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
        <Dialog
          fullScreen
          open={openNotes}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}></Typography>
            </Toolbar>
          </AppBar>

          <div style={{ margin: "5% 1% 1% 1%", height: "80vh" }}>
            {steps === 1 ? (
              <>
                <Container maxWidth="md">
                  <center style={{ marginBottom: "40px", marginTop: "20px" }}>
                    <h3>Continue With</h3>
                  </center>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper style={{ padding: "20px" }}>
                        <center>
                          <h4>Patient's Treatment Plan</h4>

                          <img src="https://img.icons8.com/color/68/000000/brief.png" />

                          <br />
                          <br />

                          <Button
                            size="large"
                            color="primary"
                            onClick={() => setsteps(3)}
                          >
                            Continue
                          </Button>
                        </center>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper style={{ padding: "20px" }}>
                        <center>
                          <h4>Therapy Process Note</h4>

                          <img src="https://img.icons8.com/color/68/000000/paper.png" />

                          <br />
                          <br />

                          <Button
                            onClick={() => setsteps(2)}
                            size="large"
                            color="primary"
                          >
                            Continue
                          </Button>
                        </center>
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </>
            ) : steps === 2 ? (
              <Container maxWidth="lg">
                <h4>Therapy Process Note</h4>
                <Editor
                  apiKey="azhogyuiz16q8om0wns0u816tu8k6517f6oqgs5mfl36hptu"
                  plugins="wordcount"
                  value={note}
                  init={{
                    height: 600,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={handleChangeEditor}
                />
                <br />
                <Button
                  size="large"
                  style={{ float: "right" }}
                  color="primary"
                  variant="contained"
                  onClick={saveData}
                >
                  Submit
                </Button>
                <Button
                  size="large"
                  style={{ float: "right", marginRight: "10px" }}
                  color="primary"
                  variant="outlined"
                  onClick={() => setsteps(1)}
                >
                  Back
                </Button>
              </Container>
            ) : steps === 3 ? (
              <Container maxWidth="lg">
                <h4>Patient's Treatment Plan</h4>
                <br />

                <h6>Diagnosis</h6>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      placeholder="Description"
                      variant="outlined"
                      name="desc"
                      value={treatment.desc}
                      onChange={changeEle}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      placeholder="Diagnostic justification and/or assessment measures"
                      variant="outlined"
                      name="justification"
                      value={treatment.justification}
                      onChange={changeEle}
                    />
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="Presenting Problem"
                      variant="outlined"
                      name="problem"
                      value={treatment.problem}
                      onChange={changeEle}
                    />
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="Treatment Goals"
                      variant="outlined"
                      name="goals"
                      value={treatment.goals}
                      onChange={changeEle}
                    />
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <InputLabel id="demo-simple-select-label">
                      Estimated Completion
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="estComp1"
                      value={treatment.estComp1}
                      onChange={changeEle}
                    >
                      <MenuItem value="1 Week">1 Week</MenuItem>
                      <MenuItem value="2 Weeks">2 Weeks</MenuItem>
                      <MenuItem value="3 Weeks">3 Weeks</MenuItem>
                      <MenuItem value="1 Month">1 Month</MenuItem>
                      <MenuItem value="2 Months">2 Months</MenuItem>
                      <MenuItem value="3 Months">3 Months</MenuItem>
                      <MenuItem value="4 Months">4 Months</MenuItem>
                      <MenuItem value="5 Months">5 Months</MenuItem>
                      <MenuItem value="6 Months">6 Months</MenuItem>
                      <MenuItem value="7 Months">7 Months</MenuItem>
                      <MenuItem value="8 Months">8 Months</MenuItem>
                      <MenuItem value="9 Months">9 Months</MenuItem>
                      <MenuItem value="10 Months">10 Months</MenuItem>
                      <MenuItem value="11 Months">11 Months</MenuItem>
                      <MenuItem value="12 Months">12 Months</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="Objective"
                      variant="outlined"
                      name="obj"
                      value={treatment.obj}
                      onChange={changeEle}
                    />
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="Treatment Strategy / Interventions"
                      variant="outlined"
                      name="strat"
                      value={treatment.strat}
                      onChange={changeEle}
                    />
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <InputLabel id="demo-simple-select-label">
                      Estimated Completion
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="estComp2"
                      value={treatment.estComp2}
                      onChange={changeEle}
                    >
                      <MenuItem value="1 Week">1 Week</MenuItem>
                      <MenuItem value="2 Weeks">2 Weeks</MenuItem>
                      <MenuItem value="3 Weeks">3 Weeks</MenuItem>
                      <MenuItem value="1 Month">1 Month</MenuItem>
                      <MenuItem value="2 Months">2 Months</MenuItem>
                      <MenuItem value="3 Months">3 Months</MenuItem>
                      <MenuItem value="4 Months">4 Months</MenuItem>
                      <MenuItem value="5 Months">5 Months</MenuItem>
                      <MenuItem value="6 Months">6 Months</MenuItem>
                      <MenuItem value="7 Months">7 Months</MenuItem>
                      <MenuItem value="8 Months">8 Months</MenuItem>
                      <MenuItem value="9 Months">9 Months</MenuItem>
                      <MenuItem value="10 Months">10 Months</MenuItem>
                      <MenuItem value="11 Months">11 Months</MenuItem>
                      <MenuItem value="12 Months">12 Months</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12} mt={1} sm={12}>
                    <TextField
                      id="outlined-basic"
                      multiline
                      rows={5}
                      fullWidth
                      placeholder="Prescribed Frequency of Treatment"
                      variant="outlined"
                      name="freq"
                      value={treatment.freq}
                      onChange={changeEle}
                    />
                  </Grid>
                </Grid>
                <br />

                <Button
                  size="large"
                  style={{ float: "right" }}
                  color="primary"
                  variant="contained"
                  onClick={saveTreatment}
                >
                  Submit
                </Button>
                <Button
                  size="large"
                  style={{ float: "right", marginRight: "10px" }}
                  color="primary"
                  variant="outlined"
                  onClick={() => setsteps(1)}
                >
                  Back
                </Button>
                <br />
                <br />
                <br />
                <br />
              </Container>
            ) : null}
          </div>
        </Dialog>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSn}
        autoHideDuration={3000}
        onClose={handleCloseSn}
        message="Treatment Saved"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSn}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      <Helmet>
        <title>Settings </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              {!user ? <div>Loading...</div> : <Img user={user} />}
              {!user ? <div>Loading...</div> : <Fun user={user} />}
            </Grid>
          </Grid>

          <h3 style={{ marginTop: "10px" }}>Notes</h3>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              {userNotes.length === 0 ? <div></div> : userNotes.map(sig_note)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
