import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_SERVICE } from "../config/URI";

// import customers from 'src/__mocks__/customers';

const CustomerList = () => {

  const [customers, setCustomers] = useState([])

  useEffect(() => {
    axios.get(`${API_SERVICE}/api/v1/main/getallusers`).then(res=>{
      setCustomers((res.data.data).reverse());
    }).catch(err=>{
      console.log("error");
    })
  },[])

  return(
    <>
    <Helmet>
      <title>Medical</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          {customers.length===0?<div></div>:<CustomerListResults customers={customers} />}
        </Box>
      </Container>
    </Box>
    </>
  )
};

export default CustomerList;
{/* <CustomerListResults customers={customers} /> */}
