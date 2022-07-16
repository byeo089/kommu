import React from 'react';
import './event.scss';
import { eventsPropTypes } from './eventsPropTypes';
import debug from 'sabio-debug';

const _logger = debug.extend('EventTable');

function EventTable({ event, index }) {
    _logger('evtData passed in as prop:', event);

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
        <tr key={index}>
            <td>{event.id}</td>
            <td>{event.name}</td>
            <td>{event.eventType.name}</td>
            <td>{event.eventStatus.name}</td>
            <td>{event.venue.name}</td>
            <td>{getFormatDate(event.dateStart)}</td>
        </tr>
    );
}

EventTable.propTypes = eventsPropTypes;

export default React.memo(EventTable);
