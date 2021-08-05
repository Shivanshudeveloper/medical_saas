import React, { useState, useEffect } from "react";
import { auth } from "../Firebase/index";

import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import AccountProfileDetails from "src/components/account/AccountProfileDetails";
import SettingsNotifications from "src/components/settings/SettingsNotifications";
import SettingsPassword from "src/components/settings/SettingsPassword";

const SettingsView = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        sessionStorage.setItem("userId", user.uid);
        sessionStorage.setItem("userEmail", user.email);
        if (!user.emailVerified) {
          user
            .sendEmailVerification()
            .then(function () {
              setUser(user);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert("An error occured!");
        }
      } else {
        console.log("No");
      }
    });
  }, []);
  return (
    <>
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
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={user} />
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          {/* <SettingsNotifications /> */}
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SettingsView;
