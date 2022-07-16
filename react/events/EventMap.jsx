import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import logger from 'sabio-debug';
import { eventsPropTypes } from './eventsPropTypes';

const _logger = logger.extend('EventMap');

const EventMap = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [evtLoc, setEvtLoc] = useState({
        center: { lat: 44, lng: -80 },
        city: '',
    });

    const [map, setMap] = useState(null);
    _logger('Map data:', setMap);

    useEffect(() => {
        if (location) {
            setEvtLoc((oldState) => {
                _logger('locationProp updating', location);
                let newState = { ...oldState };
                newState.center = { lat: location.latitude, lng: location.longitude };
                newState.city = location.city;
                return newState;
            });
            if (map) {
                map.setZoom(5);
                _logger('map setZoom firing', map);
            }
        }
    }, [location]);

    const onLoad = (marker) => {
        _logger('onLoad map', marker);
    };

    if (!isLoaded) return <div>Loading Map...</div>;
    return (
        <div>
            <GoogleMap mapContainerStyle={{ width: '100%', height: '600px' }} center={evtLoc.center} zoom={15}>
                <Marker onLoad={onLoad} title={'This is a marker'} position={evtLoc.center} />
            </GoogleMap>
        </div>
    );
};

EventMap.propTypes = eventsPropTypes;

export default EventMap;
