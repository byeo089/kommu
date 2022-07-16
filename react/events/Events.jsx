import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Container, Form, Table } from 'react-bootstrap';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import EventCard from './EventCard';
import EventTable from './EventTable';
import debug from 'sabio-debug';
import evtInfoServices from '../../services/eventInfoService';
import { lookUps } from '../../services/eventWizardService';
import CoverPhoto from './CoverPhoto';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineRollback } from 'react-icons/ai';
import { BiHide } from 'react-icons/bi';
import { FaRegHandPointDown } from 'react-icons/fa';

const _logger = debug.extend('Events');

function Events() {
    //state for paginate and search response
    const [eventData, setEventData] = useState({
        evtArray: [],
        evtComponent: [],
        pageIndex: 0,
        pageSize: 8,
        countOfItems: 0,
        current: 1,
    });

    //state for filtered data from get all response
    const [filterData, setFilterData] = useState({
        filterArray: [],
        evtIsFree: [],
        evtWorkshop: [],
        evtMeetup: [],
        evtCareer: [],
        evtDiscussion: [],
        evtConference: [],
        evtConcert: [],
        evtFundraiser: [],
        seleted: '',
    });

    //search by city, state name, venue name
    const [query, setQuery] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [toggleAll, setToggleAll] = useState(true);
    const [toggleWorkshop, setToggleWorkshop] = useState(false);
    const [toggleMeetup, setToggleMeetup] = useState(false);
    const [toggleCareer, setToggleCareer] = useState(false);
    const [toggleDiscussion, setToggleDiscussion] = useState(false);
    const [toggleConference, setToggleConference] = useState(false);
    const [toggleConcert, setToggleConcert] = useState(false);
    const [toggleFundraiser, setToggleFundraiser] = useState(false);

    const [eventState, setState] = useState({ types: [], status: [] });

    useEffect(() => {
        lookupEventTypes();
        lookupEventStatus();
        evtInfoServices.getAll().then(onGetAllSuccess).catch(onGetAllError);
    }, []);

    useEffect(() => {
        if (query.length > 0) {
            evtInfoServices
                .search(eventData.pageIndex, eventData.pageSize, query)
                .then(onSearchSuccess)
                .catch(onSearchErr);
        } else {
            evtInfoServices
                .paginate(eventData.pageIndex, eventData.pageSize)
                .then(onPaginateSuccess)
                .catch(onPaginateError);
        }
        _logger('useEffect, select all paginated. Page Index =', eventData.pageIndex);
    }, [eventData.pageIndex, query]);

    const lookupEventTypes = () => {
        lookUps(['EventTypes']).then(onLookupEventTypesSuccess).catch(onLookupEventTypesError);
    };

    const onLookupEventTypesSuccess = (response) => {
        _logger('EventType', response);

        setState((prevState) => {
            const et = { ...prevState };
            et.types = response.item.eventTypes;
            return et;
        });
    };

    const onLookupEventTypesError = (error) => {
        _logger(error);
    };

    const lookupEventStatus = () => {
        lookUps(['EventStatus']).then(onLookupEventStatusSuccess).catch(onLookupEventStatusError);
    };

    const onLookupEventStatusSuccess = (response) => {
        _logger('EventStatus', response);
        setState((prevState) => {
            const et = { ...prevState };
            et.status = response.item.eventStatus;
            return et;
        });
    };

    const onLookupEventStatusError = (error) => {
        _logger(error);
    };

    const onGetAllSuccess = (response) => {
        let responseArr = response.items;
        _logger('on get all array response', responseArr);

        setFilterData((prevState) => {
            const gd = { ...prevState };
            gd.filterArray = responseArr;
            gd.evtIsFree = responseArr.filter(filterFree).map(mapTable);
            gd.evtWorkshop = responseArr.filter(filter1).map(mapEvents);
            gd.evtMeetup = responseArr.filter(filter2).map(mapEvents);
            gd.evtCareer = responseArr.filter(filter3).map(mapEvents);
            gd.evtDiscussion = responseArr.filter(filter4).map(mapEvents);
            gd.evtConference = responseArr.filter(filter5).map(mapEvents);
            gd.evtConcert = responseArr.filter(filter6).map(mapEvents);
            gd.evtFundraiser = responseArr.filter(filter7).map(mapEvents);
            return gd;
        });
    };

    const onGetAllError = (err) => {
        _logger('on get all events error', err);
    };

    const onPaginateSuccess = (response) => {
        let responseArr = response.item.pagedItems;
        _logger('on paginate succcess', responseArr);

        setEventData((prevState) => {
            const pd = { ...prevState };
            pd.evtArray = responseArr;
            pd.evtComponent = responseArr.map(mapEvents);
            pd.countOfItems = response.item.totalCount;
            return pd;
        });
    };

    const onPaginateError = (err) => {
        _logger('on paginate error', err);
    };

    const onSearchSuccess = (response) => {
        _logger('on search success', response);
        let responseArr = response.item.pagedItems;
        setEventData((oldState) => {
            const sd = { ...oldState };
            sd.evtArray = responseArr;
            sd.evtComponent = responseArr.map(mapEvents);
            sd.countOfItems = response.item.totalCount;
            return sd;
        });
    };

    const onPaginationClicked = (page) => {
        setEventData((prevState) => {
            let pg = { ...prevState };
            pg.current = page;
            pg.pageIndex = page - 1;
            return pg;
        });
    };

    const onSearchErr = (err) => {
        _logger('onSearch failed', err);
    };

    const onSearchFieldChanged = (e) => {
        const target = e.target;
        const value = target.value;
        setQuery(value);
        _logger('searchEvent handler firing ', target, value);
    };

    const mapEvents = (event, index) => {
        return <EventCard event={event} key={index} />;
    };

    const mapTable = (event, index) => {
        return <EventTable event={event} key={index} />;
    };

    //#region -Filter Logic-
    const onIsFreeCheck = () => {
        if (isFree) {
            setIsFree(false);
        } else {
            setIsFree(true);
        }
    };
    const onShowAll = () => {
        if (toggleAll) {
            setToggleAll(!toggleAll);
        } else {
            setToggleAll(true);
            setToggleWorkshop(false);
            setToggleMeetup(false);
            setToggleCareer(false);
            setToggleDiscussion(false);
            setToggleConference(false);
            setToggleConcert(false);
            setToggleFundraiser(false);
        }
    };

    const onSelect = (e) => {
        let currentSelection = Number(e.target.value);
        _logger('onSelect Clicked', currentSelection);
        switch (currentSelection) {
            case 1:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(true),
                    setToggleMeetup(false),
                    setToggleCareer(false),
                    setToggleDiscussion(false),
                    setToggleConference(false),
                    setToggleConcert(false),
                    setToggleFundraiser(false)
                );
            case 2:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(false),
                    setToggleMeetup(true),
                    setToggleCareer(false),
                    setToggleDiscussion(false),
                    setToggleConference(false),
                    setToggleConcert(false),
                    setToggleFundraiser(false)
                );
            case 3:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(false),
                    setToggleMeetup(false),
                    setToggleCareer(true),
                    setToggleDiscussion(false),
                    setToggleConference(false),
                    setToggleConcert(false),
                    setToggleFundraiser(false)
                );
            case 4:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(false),
                    setToggleMeetup(false),
                    setToggleCareer(false),
                    setToggleDiscussion(true),
                    setToggleConference(false),
                    setToggleConcert(false),
                    setToggleFundraiser(false)
                );
            case 5:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(false),
                    setToggleMeetup(false),
                    setToggleCareer(false),
                    setToggleDiscussion(false),
                    setToggleConference(true),
                    setToggleConcert(false),
                    setToggleFundraiser(false)
                );
            case 6:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(false),
                    setToggleMeetup(false),
                    setToggleCareer(false),
                    setToggleDiscussion(false),
                    setToggleConference(false),
                    setToggleConcert(true),
                    setToggleFundraiser(false)
                );
            case 7:
                return (
                    setToggleAll(false),
                    setToggleWorkshop(false),
                    setToggleMeetup(false),
                    setToggleCareer(false),
                    setToggleDiscussion(false),
                    setToggleConference(false),
                    setToggleConcert(false),
                    setToggleFundraiser(true)
                );
            default:
                return;
        }
    };

    const filterFree = (data) => {
        let result = data.isFree;
        return result;
    };
    const filter1 = (data) => {
        let result = data.eventType.id === 1;
        return result;
    };
    const filter2 = (data) => {
        let result = data.eventType.id === 2;
        return result;
    };
    const filter3 = (data) => {
        let result = data.eventType.id === 3;
        return result;
    };
    const filter4 = (data) => {
        let result = data.eventType.id === 4;
        return result;
    };
    const filter5 = (data) => {
        let result = data.eventType.id === 5;
        return result;
    };
    const filter6 = (data) => {
        let result = data.eventType.id === 6;
        return result;
    };
    const filter7 = (data) => {
        let result = data.eventType.id === 7;
        return result;
    };
    //#endregion

    return (
        <>
            <CoverPhoto />
            <br />
            <Row>
                <Col md={2}>
                    <Row>
                        <Container>
                            <h2 className="text-center m-2 p-2">Filter Options</h2>
                            <Card.Body>
                                <Form>
                                    <Form.Select aria-label="Default select example" onChange={onSelect}>
                                        <option>Find by event type</option>
                                        {eventState.types.map((type, index) => {
                                            return (
                                                <option key={index} value={type.id} className="me-md-3 m-1">
                                                    {type.name}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                    <br />
                                    <div className="button-list">
                                        <div className="d-grid">
                                            <Button variant="info" onClick={onShowAll}>
                                                {toggleAll ? ' Hide All ' : 'Click to go back '}
                                                {toggleAll ? <BiHide /> : <AiOutlineRollback />}
                                            </Button>

                                            <Button variant="primary" onClick={onIsFreeCheck}>
                                                {isFree ? 'See Table ' : 'Click to see free events'}
                                                {isFree ? <FaRegHandPointDown /> : ''}
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Container>
                    </Row>
                </Col>
                <Col md={10}>
                    <Row>
                        <Container>
                            <div className="m-2 p-2">
                                <nav>
                                    <Row>
                                        <Col md={9}>
                                            <Form className="d-flex" role="search">
                                                <div className="btn btn-light bg-dark-60 mb-0 disabled">
                                                    <i className="fa fa-search">
                                                        <BsSearch />
                                                    </i>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    placeholder="Search by Event Status, City, State, Venue"
                                                    aria-label="Search"
                                                    value={query}
                                                    onChange={onSearchFieldChanged}
                                                    style={{ width: '750px' }}
                                                />
                                            </Form>
                                        </Col>
                                        <Col md={3}>
                                            <div>
                                                {toggleAll && (
                                                    <Pagination
                                                        showQuickJumper
                                                        locale={locale}
                                                        onChange={onPaginationClicked}
                                                        current={eventData.current}
                                                        pageSize={eventData.pageSize}
                                                        total={eventData.countOfItems}
                                                    />
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                </nav>
                            </div>
                            <div className="row row-cols-4 ms-1 m-2 p-2">
                                {toggleAll && eventData.evtComponent}
                                {toggleMeetup && filterData.evtMeetup}
                                {toggleWorkshop && filterData.evtWorkshop}
                                {toggleCareer && filterData.evtCareer}
                                {toggleDiscussion && filterData.evtDiscussion}
                                {toggleConference && filterData.evtConference}
                                {toggleConcert && filterData.evtConcert}
                                {toggleFundraiser && filterData.evtFundraiser}
                            </div>
                        </Container>
                    </Row>
                </Col>
                <Col>
                    <Container>
                        {isFree && (
                            <div className="mb-2 mx-1 mt-1">
                                <span> List of Free Events in Tabular Form</span>
                                <div className="table-responsive">
                                    <Table size="sm" className=" justify-content-center table-hover" striped>
                                        <tbody>
                                            <tr>
                                                <th>#</th>
                                                <th>Event Name</th>
                                                <th>Event Type</th>
                                                <th>Event Status</th>
                                                <th>Venue</th>
                                                <th>Start Date</th>
                                            </tr>
                                            {filterData.evtIsFree}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        )}
                    </Container>
                </Col>
            </Row>
            <hr />
        </>
    );
}

export default Events;
