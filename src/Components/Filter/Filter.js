
const Filter = {
	filterLocale: (trips,locale) => {
		if (locale === 'domestic') {
			return trips.filter(
				trip => trip.trip.destination.indexOf('United States') !== -1
			);
		}
		return trips.filter(
			trip => trip.trip.destination.indexOf('United States') === -1
		);
	},
	filterTypes: (trips,imutableTrips) => {
		const groupOne = splitTripTypes(imutableTrips);
		const groupTwo = splitTripTypes(trips);
		Object.keys(groupOne).forEach(function(key) {
			if (groupTwo.hasOwnProperty(key)) {
				groupOne[key] = groupTwo[key];
			}
			else {
				groupOne[key] = 0;
			}
		});
		function splitTripTypes(tripArray) {
			let tripObject = {};
			tripArray.forEach((trip) => {
				let splitTypes = trip.trip.type.split(', ');
				splitTypes.forEach(type => {
					if (type in tripObject) {
						tripObject[type]++;
					}
					else {
						tripObject[type] = 1;
					}
				});
			});
			return tripObject;
		}
		return groupOne;
	},
	filterPrice: (trips,low,high) => {
		return trips.filter(
			trip => trip.trip.priceLow >= Number(low) && trip.trip.priceHigh <= Number(high)
		);
	},
	filterActivity: (trips,term) => {
		return trips.filter(
			trip => `${trip.trip.type}`.toUpperCase().indexOf(term.toUpperCase()) !== -1
		);
	},
	filterSearchTerm: (trips,term) => {
		return trips.filter(
			trip => `${trip.trip.title} ${trip.trip.destination}`.toUpperCase().indexOf(term.toUpperCase()) !== -1
		);
	}
}

export default Filter;
