import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { auth } from "../Firebase/index";

//Import Icons
import FeatherIcon from "feather-icons-react";

import loginImg from "../assets/images/user/login.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = React.useState("demo@demo.com");
  const [pwd, setpwd] = React.useState("demo@1234");

  const checkUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        auth.onAuthStateChanged(function (user) {
          console.log(user);
          if (user) {
            sessionStorage.setItem("userId", user.uid);
            sessionStorage.setItem("userEmail", user.email);
            sessionStorage.setItem("userName", user.displayName);
            sessionStorage.setItem("userPhoto", user.photoURL);
            window.location.href = "/app/dashboard";
          } else {
            console.log(
              "We have send a Verification Link on your Email Address"
            );
          }
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <React.Fragment>
        <div className="back-to-home rounded d-none d-sm-block">
          <Link to="/" className="btn btn-icon btn-soft-primary">
            <i>
              <FeatherIcon icon="home" className="icons" />
            </i>
          </Link>
        </div>
        <section className="bg-home d-flex align-items-center">
          <Container>
            <Row className="align-items-center">
              <Col lg="7" md="6">
                <div className="me-lg-5">
                  <img
                    src={loginImg}
                    className="img-fluid d-block mx-auto"
                    alt="loading it wait a sec"
                  />
                </div>
              </Col>
              <Col lg="5" md="6">
                <Card className="login-page bg-white shadow rounded border-0">
                  <CardBody>
                    <div className="card-title text-center">
                      <h4 className="mb-4">Login</h4>
                    </div>
                    <AvForm className="login-form mt-4">
                      <Row>
                        <Col lg="12">
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="email">
                              Your Email <span className="text-danger">*</span>
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
                              name="email"
                              id="email"
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                              placeholder="Email"
                              required
                              errorMessage=""
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Please enter your email",
                                },
                                pattern: {
                                  value:
                                    "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                                  errorMessage: "E-Mail is not valid!",
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
                              value={pwd}
                              type="password"
                              onChange={(e) => setpwd(e.target.value)}
                              required
                              errorMessage=""
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Please enter Password",
                                },
                                minLength: {
                                  value: 6,
                                  errorMessage:
                                    "Your password must be between 6 and 8 characters",
                                },
                                maxLength: {
                                  value: 16,
                                  errorMessage:
                                    "Your password must be between 6 and 8 characters",
                                },
                              }}
                            />
                          </div>
                        </Col>

                        <Col lg="12">
                          <div className="d-flex justify-content-between">
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
                                  Remember me
                                </Label>
                              </div>
                            </div>
                            <p className="forgot-pass mb-0">
                              <Link
                                to="auth-re-password"
                                className="text-dark fw-bold"
                              >
                                Forgot password ?
                              </Link>
                            </p>
                          </div>
                        </Col>
                        <Col lg="12" className="mb-0">
                          <div className="d-grid">
                            <Button onClick={checkUser} color="primary">
                              Sign in
                            </Button>
                          </div>
                        </Col>
                        <Col lg="12" className="mt-4 text-center">
                          <h6>Or Login With</h6>
                          <Row>
                            <div className="col-12 mt-3">
                              <div className="d-grid">
                                <Link to="#" className="btn btn-light">
                                  <i className="mdi mdi-google text-danger"></i>{" "}
                                  Google
                                </Link>
                              </div>
                            </div>
                          </Row>
                        </Col>
                        <Col xs="12" className="text-center">
                          <p className="mb-0 mt-3">
                            <small className="text-dark me-2">
                              Don't have an account ?
                            </small>{" "}
                            <Link to="/register" className="text-dark fw-bold">
                              Sign Up
                            </Link>
                          </p>
                        </Col>
                      </Row>
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    </>
  );
};

export default Login;
