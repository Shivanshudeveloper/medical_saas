import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Container, Row } from 'reactstrap';

//import video
import video from '../../assets/images/video/call.mp4'

export default class Section extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="bg-half-170 d-table w-100">
                    <Container>
                        <Row className="mt-5 align-items-center position-relative" style={{ zIndex : '1'}}>
                            <Col lg={6}>
                                <div className="title-heading text-center text-lg-start">
                                    <h4 className="heading fw-bold mb-3 mt-3">NEO,</h4>
                                    <h6 className="fw-bold mb-3 mt-3">FOR THE MODERN THERAPIST & COUNSELOR </h6>
                                    <p className="para-desc text-muted mx-auto mx-lg-start mb-0">Take control of your sessions. Neo is your one tool to streamline your counseling and therapy practice.</p>
                                    <div className="mt-3">
                                        <Link to="#" className="btn btn-soft-primary mt-2">Getting Started</Link>
                                        <p className="mt-3 mb-0 text-muted">*No credit card required</p>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6} className="mt-4 pt-2 mt-lg-0 pt-lg-0">
                                <Card className="border-0 shadow rounded ms-lg-4 overflow-hidden">
                                    <div className="d-flex p-2 bg-light justify-content-between align-items-center">
                                        <div>
                                            <Link to="#" className="text-danger"><i className="mdi mdi-circle"></i></Link>
                                            <Link to="#" className="text-warning"><i className="mdi mdi-circle"></i></Link>
                                            <Link to="#" className="text-success"><i className="mdi mdi-circle"></i></Link>
                                        </div>

                                        <small className="fw-bold"><i className="mdi mdi-circle-medium text-success"></i> Neo Therapists</small>
                                    </div>
                                    <div className="bg-light px-2 position-relative">
                                        <video className="w-100 rounded" controls autoPlay loop>
                                            <source src={video} type="video/mp4" />
                                        </video>

                                        <div className="position-absolute top-0 start-0">
                                            <div className="mt-2 ms-3">
                                                <span className="badge bg-danger">LIVE</span>
                                                <small className="mb-0 text-white title-dark">4 Attendance</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2 bg-light">
                                        <p className="text-muted mb-0"><b>Note:</b> This video is only for demo purposes.</p>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        )
    }
}
