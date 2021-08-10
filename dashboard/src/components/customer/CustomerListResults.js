import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Paper,
  InputBase,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import getInitials from "src/utils/getInitials";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_SERVICE } from "../../config/URI";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const CustomerListResults = ({ customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [customersToDisplay, setCustomersToDisplay] = useState(customers);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPost();
    }
  };

  const searchPost = async () => {
    if (search.trim()) {
      const data = await axios.get(
        `${API_SERVICE}/api/v1/main/searchuser?searchQuery=${search || "none"}`
      );
      console.log(data.data.data);
      setCustomersToDisplay(data.data.data);
    } else {
      setCustomersToDisplay(customers);
    }
  };

  return (
    <Card {...rest}>
      <Paper
        sx={{
          maxWidth: 500,
          display: "flex",
          margin: "15px",
          marginLeft: "auto",
          padding: "2px",
        }}
      >
        <InputBase
          className={classes.input}
          placeholder="Search Client By Name, Email, Location, Phone"
          inputProps={{ "aria-label": "search client" }}
          value={search}
          onKeyPress={handleKeyPress}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={searchPost}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="clear"
          onClick={() => {
            setSearch("");
            setCustomersToDisplay(customers);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Paper>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersToDisplay.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={customer.image} sx={{ mr: 2 }}>
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.location}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    {moment(customer.regDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Button
                      href={`/app/profile?id=${customer._id}`}
                      variant="contained"
                      color="primary"
                    >
                      See More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};

export default CustomerListResults;
