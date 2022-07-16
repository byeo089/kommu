import PropTypes from 'prop-types';

const eventsPropTypes = {
    event: PropTypes.shape({
        id: PropTypes.number,
        eventType: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            }
        ),
        name: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        eventStatus: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            }),
        venue: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                description: PropTypes.string,
                locationId: PropTypes.number,
                imageUrl: PropTypes.string,
                url: PropTypes.string,
            }),
        location:PropTypes.shape({
                id: PropTypes.number,
                locationTypeId: PropTypes.number,
                lineOne: PropTypes.string,
                lineTwo: PropTypes.string,
                city: PropTypes.string,
                zip: PropTypes.string,
                latitude: PropTypes.number,
                longitude: PropTypes.number,
            }),
        state: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                countryId: PropTypes.number,
            }),
        imageUrl: PropTypes.string.isRequired,
        externalSiteUrl: PropTypes.string.isRequired,
        isFree: PropTypes.bool.isRequired,
        dateStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dateEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
};

export { eventsPropTypes };
