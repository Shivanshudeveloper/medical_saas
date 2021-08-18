import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "./Logo";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

import { auth } from "../Firebase/index";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        sessionStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <Button
            color="inherit"
            component={Link}
            to="/app/customers"
            className="navbarButton"
          >
            add progress notes
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/app/customers"
            className="navbarButton"
          >
            treatment plan
          </Button>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              {/* <NotificationsIcon /> */}
            </Badge>
          </IconButton>
          <IconButton onClick={logout} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
