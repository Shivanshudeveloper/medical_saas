import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';

export default class Encryption extends Component {
  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col lg={4}>
              <Card
                style={{
                  borderColor: '#4D61FC',
                  borderWidth: '2px',
                  boxShadow: '2px 2px 2px #888888',
                }}
                variant="outlined"
              >
                <CardContent>
                  <div style={{ textAlign: 'center' }}>
                    <h3>Starting Up</h3>
                    <p>Perfect if you are just starting your practice</p>
                    <br></br>
                    <h6>INR 1999/year</h6>
                  </div>
                  <hr></hr>
                  <div style={{ textAlign: 'center' }}>
                    <h6>Number of clients per month</h6>
                    <p>Less than 10 </p>
                    <hr></hr>
                    <h6>Premium features</h6>
                    <p>Additional </p>
                    <hr></hr>
                    <h6>Custom Reports </h6>
                    <p>Not Included</p>

                    <Button
                      style={{ borderColor: 'black', borderWidth: '3px' }}
                      className="mt-3"
                      variant="outlined"
                      component={Link}
                      to="/register?plan=starting"
                    >
                      <b>Start Now</b>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                style={{
                  borderColor: '#4D61FC',
                  borderWidth: '5px',
                  boxShadow: '10px 10px 10px #888888',
                }}
                variant="outlined"
              >
                <CardContent>
                  <div style={{ textAlign: 'center' }}>
                    <h3>GROWING PRACTICE</h3>
                    <p>Ideal for professionals with 3-5 years of practice</p>
                    <h6>INR 6999/year</h6>
                  </div>
                  <hr></hr>
                  <div style={{ textAlign: 'center' }}>
                    <h6>Number of clients per month</h6>
                    <p>10-50 </p>
                    <hr></hr>
                    <h6>Premium features</h6>
                    <p>Limited </p>
                    <hr></hr>
                    <h6>Custom Reports </h6>
                    <p>Limited </p>

                    <Button
                      style={{ backgroundColor: 'black', color: 'white' }}
                      className="mt-3"
                      variant="contained"
                      component={Link}
                      to="/register?plan=growing"
                    >
                      <b>Start Now</b>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Col>
            <Col lg={4}>
              <Card
                style={{
                  borderColor: '#4D61FC',
                  borderWidth: '2px',
                  boxShadow: '2px 2px 2px #888888',
                }}
                variant="outlined"
              >
                <CardContent>
                  <div style={{ textAlign: 'center' }}>
                    <h3>Established</h3>
                    <p>
                      Perfect for professionals with more than 5 years of
                      experience
                    </p>
                    <h6>INR 16999/year</h6>
                  </div>
                  <hr></hr>
                  <div style={{ textAlign: 'center' }}>
                    <h6>Number of clients per month</h6>
                    <p>More than 50 </p>
                    <hr></hr>
                    <h6>Premium features</h6>
                    <p>Included </p>
                    <hr></hr>
                    <h6>Custom Reports </h6>
                    <p>Included </p>

                    <Button
                      style={{ borderColor: 'black', borderWidth: '3px' }}
                      className="mt-3"
                      variant="outlined"
                      component={Link}
                      to="/register?plan=established"
                    >
                      <b>Start Now</b>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Col>
          </Row>
        </Container>
        <div
          className="mt-5"
          style={{ backgroundColor: '#4D61FC', padding: '5% 10%' }}
        >
          <Row
            className="mt-5"
            style={{
              backgroundColor: 'white',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'black',
              padding: '3%',
              borderRadius: '20px',
            }}
          >
            <Col lg={4}>
              <h4>
                <b>
                  Are you ready to start? Sign up now and get 50% off on your
                  subscription
                </b>
              </h4>
              <p style={{ margin: '0' }}>Sign up now for early access.</p>
              <p>No credit card required.</p>
            </Col>
            <Col lg={8}>
              <div style={{ marginTop: '10%' }}>
                <TextField
                  style={{ width: '80%', margin: '0' }}
                  fullWidth
                  margin="normal"
                  placeholder="Email Address"
                  variant="outlined"
                />
                <Button
                  style={{
                    float: 'right',
                    backgroundColor: '#4D61FC',
                    color: 'white',
                    height: '50px',
                  }}
                  variant="contained"
                >
                  Subscribe
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
