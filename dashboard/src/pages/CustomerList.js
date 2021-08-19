import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "src/components/customer/CustomerListResults";
import CustomerListToolbar from "src/components/customer/CustomerListToolbar";
import { useState, useEffect } from "react";
import axios from "axios";

import { API_SERVICE } from "../config/URI";

// import customers from 'src/__mocks__/customers';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
      <Helmet>
        <title>Neo Therapists</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ pt: 3 }}>
            {loading === true ? (
              <div style={{ textAlign: "center" }}>
                <h3>Loading...</h3>
              </div>
            ) : (
              <CustomerListResults customers={customers} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
{
  /* <CustomerListResults customers={customers} /> */
}
