import { Helmet } from 'react-helmet';
import { Box, Container,Grid, Card , CardHeader, TextField, Divider, CardContent, Button} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import SettingsNotifications from 'src/components/settings/SettingsNotifications';
import SettingsPassword from 'src/components/settings/SettingsPassword';
import { useState, useEffect } from 'react';
import moment from 'moment';

import queryString from 'query-string';
import axios from 'axios';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Avatar,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const [user, setUser] = useState([])

useEffect(()=>{
    const { id } = queryString.parse(window.location.search);
    console.log(id);
    axios.get(`http://localhost:5000/api/v1/main/getuser/${id}`).then(res=>{
        setUser(res.data)
        console.log(res.data)
    })
},[])

const img = (data) => {
    return(
    <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={data.image}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {data.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {data.location}
        </Typography>
      </Box>
    </CardContent>
  </Card>
)
}

const fun = (data) => {
    return(
        <Card>
        <CardHeader
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                // onChange={handleChange}
                required
                value={data.name}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                // onChange={handleChange}
                required
                value={data.email}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                // onChange={handleChange}
                // type="number"
                value={data.phone}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Location"
                name="country"
                // onChange={handleChange}
                required
                value={data.location}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Registeration Date"
                // onChange={handleChange}
                required
                value={moment(data.regDate).format('DD/MM/YYYY')}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
            <Typography>
              <h3>Description</h3>
              <p>{data.description}</p>
            </Typography>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    );
}

const [note, setNote] = useState('')

const saveData = () => {
  let temp = {
    name: user[0].name,
    email: user[0].email,
    location: user[0].location,
    phone: user[0].phone,
    regDate: user[0].regDate,
    description: user[0].description,
    image: user[0].image,
    note: note,
  }
  console.log(temp);
  axios.post('http://localhost:5000/api/v1/main/addnote', temp).then(res=>{
    console.log(res);
    handleClose()
  }).catch(err => {
    console.log(err);
  })
}

return(
    <>
    <div>
      <div style={{textAlign: 'right', margin: '20px 30px 0 0'}}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Notes
      </Button>
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            <Button autoFocus color="inherit" onClick={saveData}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{margin: "5% 1% 1% 1%", height: "80vh"}}>
        <CKEditor
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
          onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
              setNote(data);
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
        />
        </div>
      </Dialog>
    </div>
    <Helmet>
      <title>Settings | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            {user.length === 0?<div>Loading...</div>:user.map(img)}
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            {user.length === 0?<div>Loading...</div>:user.map(fun)}
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
    );
};

export default Profile;
