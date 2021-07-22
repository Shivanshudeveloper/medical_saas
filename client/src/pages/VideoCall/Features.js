import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap'

import SectionTitle from '../../components/Shared/SectionTitle';

//Import Icons
import FeatherIcon from "feather-icons-react";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Features extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    {/* <SectionTitle
                        title="Wait! There is More!"
                        desc="NEO can help streamline every part of your workflow"
                    /> */}
                    <div style={{textAlign: 'center'}}>
                        <h3>Wait! There is More!</h3>
                        <p>NEO can help streamline every part of your workflow</p>
                    </div>
                    <Row className="justify-content-center">
                        <Col>
                            <Row>
                                <Col lg={3} className="mt-4 pt-2">
                                    <Card>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Accept Payments Online</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Integrated payment the way you want it - prepaid, post session or monthly subscription and packages.</p>
                                            <br></br>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>

                                <Col lg={3} className="mt-4 pt-2">
                                    <Card>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Built for Remote Sessions</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Conduct your session online with our no download secure video - no more struggling with zoom, gmeet or other tools.</p>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>

                                <Col lg={3} className="mt-4 pt-2">
                                    <Card variant="outlined" style={{borderColor: '#4D61FC', borderWidth: '3px'}}>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Send Reminders</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Remind clients to schedule next session, gently. By email, sms or whatsapp, automatically without having to do the manual work</p>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>

                                <Col lg={3} className="mt-4 pt-2">
                                    <Card>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Progress Reports</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Generate quarterly progress reports that you can review with your clients. Keep track of how far you and client have come.</p>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} className="mt-4 pt-2">
                                    <Card variant="outlined" style={{borderColor: '#4D61FC', borderWidth: '3px'}}>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Host Workshops & Webinars</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Interested in conducting workshops and webinars? You can do all of it here, including registration, ticketing and followup.</p>
                                            <br></br>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>

                                <Col lg={3} className="mt-4 pt-2">
                                    <Card variant="outlined" style={{borderColor: '#4D61FC', borderWidth: '3px'}}>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Create Content</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Post articles, import social media posts, build your mailing list and share interesting content with your clients and beyond.</p>
                                            <br/>
                                            <br/>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>

                                <Col lg={3} className="mt-4 pt-2">
                                    <Card variant="outlined" style={{borderColor: '#4D61FC', borderWidth: '3px'}}>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Build a Community</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>All the tools you need to build, engage and grow a thriving community is here. Just plug and play</p>
                                            <br/>
                                            <br/>
                                            <br/>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>

                                <Col lg={3} className="mt-4 pt-2">
                                    <Card>
                                        <CardContent>
                                            <h5 style={{fontWeight: 'bold'}}>Want something else?</h5>
                                            <p style={{color: 'rgba(48,48,48,0.8)'}}>Let us know if we missed anything. We are happy to add it to the platform. Thanks for sharing.</p>
                                            <br/>
                                            <br/>
                                            <br/>
                                        </CardContent>
                                        <CardActions>
                                            <Button style={{fontWeight: 'bold', color: '#4D61FC'}}>
                                                Learn More 
                                                <FeatherIcon
                                                icon="arrow-right"
                                                className="fea icon-sm"
                                                />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Col>


                                <Col xs={12} className="mt-4 pt-2 text-center">
                                    <Link to="#" className="text-primary h6">Explore features
                                    <FeatherIcon
                                            icon="arrow-right"
                                            className="fea icon-sm"
                                        />
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
