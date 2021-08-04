import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import queryString from 'query-string';

import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from 'reactstrap';
import { CardContent, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CardInput from './CardInput';

import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { API_SERVICE } from '../../config/URI';
import { auth } from '../../Firebase/index';

import { makeStyles } from '@material-ui/core/styles';

//Import Icons
import FeatherIcon from 'feather-icons-react';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: '15px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

const Payment = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');
  const [paysubmit, setPaySubmit] = useState(false);
  const [isRegistered, setisRegistered] = useState(false);
  const [isUser, setisUser] = useState(false);
  const [open, setOpen] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const id = queryString.parse(window.location.search);
    setTitle(id.plan);
    switch (id.plan) {
      case 'starting':
        setAmount(1999);
        break;
      case 'growing':
        setAmount(6999);
        break;
      case 'established':
        setAmount(16999);
        break;

      default:
        break;
    }
  }, []);

  const confirmPayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setPaySubmit(true);

    const res = await axios.post(`${API_SERVICE}/api/v1/main/charges`, {
      email: email,
      amount: amount,
    });

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    handleClick();

    // window.location.href = `https://medical-saas-dashboard.vercel.app/login`;
    window.location.href = `http://localhost:3000/login`;
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const register = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        var user = result.user;
        console.log(user);
        // Profile Picture being set by default
        user
          .updateProfile({
            displayName: `${fName} ${lName}`,
            photoURL:
              'https://kittyinpink.co.uk/wp-content/uploads/2016/12/facebook-default-photo-male_1-1.jpg',
          })
          .then(() => {
            console.log('Profile Photo URL Added');
            setisRegistered(true);
            setMessage('');
          })
          .catch((err) => console.log(err));
      })
      .catch(function (error) {
        var errorMessage = error.message;
        setMessage(errorMessage);
      });
  };

  return (
    <section className="bg-auth-home d-table w-100">
      <Container>
        <Row className="align-items-center">
          <Col lg="6" md="6" className="mt-4 mx-auto mt-sm-0 pt-2 pt-sm-0">
            <Card className="login_page shadow rounded border-0">
              <CardBody>
                <h4 className="card-title text-center">
                  Signup for <span className="text-capitalize">{title}</span>
                </h4>
                <AvForm className="login-form mt-4">
                  <Row>
                    <Col md="6">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="firstname">
                          First name <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <FeatherIcon
                              icon="user"
                              className="fea icon-sm icons"
                            />
                          </i>
                        </div>
                        <AvField
                          type="text"
                          className="form-control ps-5"
                          name="firstname"
                          id="firstname"
                          placeholder="First Name"
                          required
                          errorMessage=""
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter first name',
                            },
                          }}
                        />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="lastname">
                          Last name <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <FeatherIcon
                              icon="user-check"
                              className="fea icon-sm icons"
                            />
                          </i>
                        </div>
                        <AvField
                          type="text"
                          className="form-control ps-5"
                          name="lastname"
                          id="lastname"
                          placeholder="Last Name"
                          required
                          errorMessage=""
                          value={lName}
                          onChange={(e) => setLName(e.target.value)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter last name',
                            },
                          }}
                        />
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="email">
                          Your Email <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <FeatherIcon
                              icon="mail"
                              className="fea icon-sm icons"
                            />
                          </i>
                        </div>
                        <AvField
                          type="text"
                          className="form-control ps-5"
                          name="email"
                          id="email"
                          placeholder="Enter Email"
                          required
                          errorMessage=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter your email',
                            },
                            pattern: {
                              value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
                              errorMessage: 'E-Mail is not valid!',
                            },
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg="12">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="password">
                          Password <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <FeatherIcon
                              icon="lock"
                              className="fea icon-sm icons"
                            />
                          </i>
                        </div>
                        <AvField
                          type="text"
                          className="form-control ps-5"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={password}
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          errorMessage=""
                          validate={{
                            required: {
                              value: true,
                              errorMessage: 'Please enter Password',
                            },
                            minLength: {
                              value: 6,
                              errorMessage:
                                'Your password must be between 6 and 16 characters',
                            },
                            maxLength: {
                              value: 16,
                              errorMessage:
                                'Your password must be between 6 and 16 characters',
                            },
                          }}
                        />
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="d-grid">
                        <Button
                          color="primary"
                          disabled={isUser}
                          onClick={register}
                        >
                          Register
                        </Button>
                      </div>
                      <p
                        style={{
                          margin: '5px 0',
                          textAlign: 'right',
                          color: 'red',
                        }}
                      >
                        {message}
                      </p>
                    </Col>

                    <Col
                      md="12"
                      style={{
                        marginTop: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Label
                        style={{ cursor: 'pointer' }}
                        className="form-label"
                        onClick={() => {
                          setisUser((prev) => !prev);
                          setisRegistered((prev) => !prev);
                        }}
                      >
                        Already a User? Click here.
                      </Label>
                    </Col>

                    <Col md="12">
                      <center>
                        <div className={classes.root}>
                          <h6 className="text-center font-weight-bold">
                            Card Details
                          </h6>
                          <CardContent className={classes.content}>
                            <CardInput />
                          </CardContent>
                        </div>
                      </center>
                    </Col>

                    <Col md="12">
                      <div className="mb-3">
                        <div className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          >
                            I Accept{' '}
                            <Link to="#" className="text-primary">
                              Terms And Condition
                            </Link>
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="d-grid">
                        <Button
                          color="primary"
                          onClick={confirmPayment}
                          disabled={paysubmit || (!isRegistered && true)}
                        >
                          {paysubmit ? 'Confirming Payment' : 'Apply'}
                        </Button>
                        <Snackbar
                          open={open}
                          autoHideDuration={6000}
                          onClose={handleClose}
                        >
                          <MuiAlert
                            onClose={handleClose}
                            severity="success"
                            elevation={6}
                            variant="filled"
                          >
                            Payment Successfull!
                          </MuiAlert>
                        </Snackbar>
                      </div>
                    </Col>
                  </Row>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Payment;
