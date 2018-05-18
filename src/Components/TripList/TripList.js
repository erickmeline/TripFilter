import React from 'react';
import Trip from '../Trip/Trip.js';

class TripList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.trips.map((trip) => <Trip trip={trip.trip} key={trip.trip.id}/>,this)}
			</ul>
		);
	}
}

export default TripList;
