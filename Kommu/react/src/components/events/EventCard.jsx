import React from 'react';
import './event.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { eventsPropTypes } from './eventsPropTypes';
import debug from 'sabio-debug';

const _logger = debug.extend('EventCard');

function EventCard({ event }) {
    const navigate = useNavigate();

    const naviToEventPage = (event) => {
        const stateForTransport = { type: 'event_detail', payload: event };
        _logger('navigate to Event page', event);
        navigate(`/event/view/${event.id}`, { state: stateForTransport });
    };
    const onEventDetailsClicked = () => {
        naviToEventPage(event);
    };

    const naviToEventWiz = (event) => {
        _logger('navigate to Event page', event);
        navigate(`/eventwizard/${event.id}`, { state: { type: 'event_update', payload: event } });
    };
    const onEventEditClicked = () => {
        naviToEventWiz(event);
    };

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

    _logger('evtData passed in as prop:', event);

    return (
        <div className="event-card mb-4 mt-2">
            <Card className="event-card-style justify-content-center" style={{ width: '22rem' }}>
                <Card.Img className="img-responsive event-card-image" src={event.imageUrl} />
                <Card.Header>
                    <div className="text-center">
                        <Card.Text as="h2">{event.name[0].toUpperCase() + event.name.substring(1)}</Card.Text>
                        <Card.Text className="font-15">
                            {event.summary}
                            <br />
                            <br />
                            <strong>Type: </strong>
                            {event.eventType.name}
                            <br />
                            <strong>Status: </strong>
                            {event.eventStatus.name}
                        </Card.Text>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text dangerouslySetInnerHTML={{ __html: event.shortDescription }}></Card.Text>
                    <Card.Text>
                        <strong>Venue: </strong>
                        <em>{event.venue.name}</em>
                        <br />
                        <strong>Website: </strong>
                        <span dangerouslySetInnerHTML={{ __html: event.venue.url }}></span>
                        <br />
                        <strong>Location: </strong>
                        <em>{event.location.city + ', ' + event.state.name}</em>
                    </Card.Text>
                    <Card.Text style={{ color: '#d1410c' }}>
                        <strong>{event.isFree ? 'Free' : 'Paid'}</strong>
                        <br />
                        <strong> {getFormatDate(event.dateStart)} </strong>
                    </Card.Text>
                    <Card.Footer>
                        <div className="text-center">
                            {false && (
                                <Button variant="danger" onClick={onEventEditClicked} event={event}>
                                    Edit
                                </Button>
                            )}
                            <Button variant="success" onClick={onEventDetailsClicked}>
                                Details
                            </Button>
                        </div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    );
}

EventCard.propTypes = eventsPropTypes;

export default React.memo(EventCard);
