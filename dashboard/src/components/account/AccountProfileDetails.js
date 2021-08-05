import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import { auth } from "../../Firebase/index";

const AccountProfileDetails = ({ user }) => {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    phoneNumber: null,
  });

  useEffect(() => {
    setUserDetails({
      displayName: user?.displayName,
      phoneNumber: user?.phoneNumber,
    });
  }, [user]);

  const [edit, setEdit] = useState(true);

  const updateUser = () => {
    const user = auth.currentUser;
    user
      .updateProfile({
        displayName: userDetails.displayName,
        phoneNumber: userDetails.phoneNumber,
      })
      .then(() => {
        setEdit((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Email Address"
                name="email"
                required
                disabled
                value={userDetails.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the full name"
                placeholder="First name"
                name="displayName"
                onChange={handleChange}
                required
                disabled={edit}
                value={userDetails.displayName}
                variant="outlined"
              />
            </Grid>

            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                type="number"
                disabled={edit}
                value={userDetails.phoneNumber}
                variant="outlined"
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          {edit ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => setEdit((prev) => !prev)}
            >
              Edit details
            </Button>
          ) : (
            <Button color="primary" variant="contained" onClick={updateUser}>
              Save Details
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
