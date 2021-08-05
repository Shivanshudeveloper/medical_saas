import React, { useState, useEffect } from "react";

import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

const AccountProfile = ({ user }) => {
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
            src={user?.avatar}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {user?.displayName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default AccountProfile;
