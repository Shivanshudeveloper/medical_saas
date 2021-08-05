// React Basic and Bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//Import components
import PageBreadcrumb from '../../components/Shared/PageBreadcrumb';

//Import Icons
import FeatherIcon from 'feather-icons-react';

// import images

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathItems: [
        //id must required
        { id: 1, name: 'Landrick', link: '/index' },
        { id: 2, name: 'Page', link: '#' },
        { id: 3, name: 'Pricing', link: '#' },
      ],
      Contactvisible: false,
    };
  }

  componentDidMount() {
    document.body.classList = '';
    window.addEventListener('scroll', this.scrollNavigation, true);
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById('topnav').classList.add('nav-sticky');
    } else {
      document.getElementById('topnav').classList.remove('nav-sticky');
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* breadcrumb */}
        <PageBreadcrumb title="Pricing" pathItems={this.state.pathItems} />
        <div className="form-icon position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        <section className="section pb-5">
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
        </section>
      </React.Fragment>
    );
  }
}
export default Pricing;
