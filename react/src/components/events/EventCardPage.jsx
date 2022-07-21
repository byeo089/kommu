import React, { useState, useEffect } from 'react';
import './event.scss';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import { MdPolicy } from 'react-icons/md';
import debug from 'sabio-debug';
import EventMap from './EventMap';
// import EventsCoverImg from './EventsCoverImg';

const _logger = debug.extend('EventCardPage');

function EventCardPage() {
    const { id } = useParams();
    const [evtPgData, setEvtPgData] = useState({
        id: 0,
        eventType: [],
        name: '',
        summary: '',
        shortDescription: '',
        eventStatus: [],
        imageUrl: '',
        externalSiteUrl: '',
        isFree: '',
        venue: [],
        location: [],
        state: [],
        dateStart: '',
        dateModified: '',
        dateEnd: '',
        dateCreated: '',
    });

    const { state } = useLocation();
    _logger('EventCardPage', state);

    useEffect(() => {
        setEvtPgData((prevState) => {
            let sp = state.payload;
            let epd = { ...prevState };
            epd = { ...sp };
            return epd;
        });
    }, [id]);

    const getFormatDate = (strDate) => {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const strSplitDate = String(strDate).split(' ');
        let date = new Date(strSplitDate[0]);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;

        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        date = `${months[mm]} ${dd}, ${yyyy}`;

        return date;
    };

    return (
        <div className="event-details">
            <hr />
            <section>
                <img className="card-img-overlay bg-event-image" src={evtPgData.imageUrl} alt="" />
                <Container>
                    <Card>
                        <div>
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <Card.Img src={evtPgData.imageUrl} className="event-page-image" />
                                </Col>
                                <Col md={4}>
                                    <div className="p-3">
                                        <Card.Text className="event-page-right">
                                            {getFormatDate(evtPgData.dateStart.split('T')[0])}
                                        </Card.Text>
                                    </div>

                                    <div className="p-2 m-2">
                                        <Card.Text className="event-page-right">{evtPgData.name}</Card.Text>
                                        <Card.Text as="h4"> {evtPgData.summary}</Card.Text>
                                    </div>

                                    <div className="p-2 m-2">
                                        <Card.Text className="event-page-right">{evtPgData.venue.name}</Card.Text>
                                        <Card.Text as="h4"> {evtPgData.venue.url}</Card.Text>
                                    </div>

                                    <div className="p-2 m-2">
                                        <Card.Text className="event-page-right">Event Status / Cost</Card.Text>
                                        <Card.Text as="h4">
                                            <em>{evtPgData.eventStatus.name}</em>
                                            <br />
                                            <em>{evtPgData.isFree ? 'Free' : 'Paid, see details down below'}</em>
                                        </Card.Text>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    <Card>
                        <Row>
                            <Col md={8}>
                                <Container className="align-text-left">
                                    <h1 className="text-success my-2 py-2">
                                        <em>ABOUT THE EVENT:</em>
                                    </h1>
                                    <dl className="row">
                                        <dt className="col-md-3 mb-3">
                                            <h3 className="text-dark">
                                                <strong>EVENT INFO</strong>
                                            </h3>
                                        </dt>
                                        <dd className="col-md-9 mb-3">
                                            <h4>{evtPgData.name}</h4>
                                            <h4
                                                dangerouslySetInnerHTML={{
                                                    __html: evtPgData.shortDescription,
                                                }}></h4>
                                            <h4>{evtPgData.summary}</h4>
                                            <h4>
                                                {evtPgData.isFree
                                                    ? 'Free event'
                                                    : 'Buy your ticket now to take advantage of the limited seating'}
                                            </h4>
                                        </dd>
                                        <hr />
                                        <dt className="col-md-3 mb-3">
                                            <h3 className="text-dark">VENUE INFO</h3>
                                        </dt>
                                        <dd className="col-md-9 mb-3">
                                            <h4>{evtPgData.venue.name}</h4>
                                            <h4>{evtPgData.venue.description}</h4>
                                            <h4>{evtPgData.venue.url}</h4>
                                            <img className="venue-img" src={evtPgData.venue.imageUrl} alt="venueImg" />
                                        </dd>
                                        <hr />
                                        <dt className="col-md-3 mb-3">
                                            <h3 className="text-dark">WEBSITES</h3>
                                        </dt>
                                        <dd className="col-md-9 mb-3">
                                            <h4>Check out venue site for more details</h4>
                                            <h5
                                                dangerouslySetInnerHTML={{
                                                    __html: evtPgData.externalSiteUrl,
                                                }}></h5>
                                        </dd>
                                    </dl>
                                    <div></div>
                                    <footer>
                                        <p className="text-muted mt-4">SHARE WITH FRIEND</p>
                                        <ul className="social-list list-inline mt-3">
                                            <li className="list-inline-item text-center">
                                                <a
                                                    href="/"
                                                    className="social-list-item border-primary text-primary d-flex align-items-center justify-content-center">
                                                    <FaFacebookF />
                                                </a>
                                            </li>
                                            <li className="list-inline-item text-center">
                                                <a
                                                    href="/"
                                                    className="social-list-item border-danger text-danger d-flex align-items-center justify-content-center">
                                                    <FaGoogle />
                                                </a>
                                            </li>
                                            <li className="list-inline-item text-center">
                                                <a
                                                    href="/"
                                                    className="social-list-item border-info text-info d-flex align-items-center justify-content-center">
                                                    <FaTwitter />
                                                </a>
                                            </li>
                                        </ul>
                                    </footer>
                                </Container>
                            </Col>

                            <Col md={4}>
                                <Container className="event-card-container">
                                    <div className="event-detail-head p-3 m-3">
                                        <BsFillCalendarCheckFill /> Date:
                                        <br />
                                        <div className="event-detail-content">
                                            {getFormatDate(evtPgData.dateStart.split('T')[0])}
                                        </div>
                                    </div>
                                    <div className="event-detail-head p-3 m-3">
                                        <HiLocationMarker /> Location:
                                        <br />
                                        <div className="event-detail-content ">
                                            <Card.Text>
                                                {evtPgData.location.lineOne}
                                                {evtPgData.location.lineTwo ? evtPgData.location.lineTwo : ''}
                                                <br />
                                                {evtPgData.location.city}
                                                {', '}
                                                {evtPgData.state.code} {evtPgData.location.zip}
                                            </Card.Text>
                                        </div>
                                    </div>

                                    <div className="card-title event-detail-head p-3 m-3">
                                        <MdPolicy /> Cost:
                                        <br />
                                        <div className="event-detail-content">
                                            {evtPgData.isFree ? 'Free' : 'See ticketing information for more details'}
                                        </div>
                                    </div>
                                </Container>
                            </Col>
                        </Row>
                    </Card>

                    <Card>
                        <Row className="g-0 align-items-center">
                            <EventMap location={evtPgData.location} />
                        </Row>
                    </Card>
                </Container>
            </section>
        </div>
    );
}

export default EventCardPage;
