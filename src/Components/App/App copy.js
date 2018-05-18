import React from 'react';
import './App.css';
import FetchTrips from '../../util/FetchTrips.js';
import TripList from '../TripList/TripList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import QuickPicks from '../SearchBar/QuickPicks.js';
import Filter from '../Filter/Filter.js';

//var data = require('../../util/trips.json');
  const loadJSON = function (callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'trips.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }

class App extends React.Component {
  constructor(props) {
    super(props);
  //  this.getTrips();
    this.state = {
      trips : [{trip:{
        dates: 'loading',
        destination: 'loading',
        dificulty: 'loading',
        group: 'loading',
        highlights: 'loading',
        id: 'loading',
        image: {src: 'loading', alt: 'loading'},
        includes: 'loading',
        itenerary: 'loading',
        leader1: 'loading',
        leader2: 'loading',
        leader3: 'loading',
        overview: 'loading',
        path: 'loading',
        priceHigh: 'loading',
        priceLow: 'loading',
        title: 'loading',
        type: 'loading'
      }}],
      tripTypes : {loading: 0},
      tripCount: 0,
      domestic: 0,
      international: 0,
      trips: this.getTrips() // testing
    };
    this.getTrips = this.getTrips.bind(this);
    this.filterSearchTerm = this.filterSearchTerm.bind(this);
    this.filterActivity = this.filterActivity.bind(this);
    this.tripTypes = this.tripTypes.bind(this);
    this.filterPrice = this.filterPrice.bind(this);
    this.filterLocale = this.filterLocale.bind(this);
    this.filterDomestic = this.filterDomestic.bind(this);
    this.filterInternational = this.filterInternational.bind(this);
    this.reset = this.reset.bind(this);

  }
  getTrips() {
      //return data.trips; // testing
      // this.setState({immutableTrips: data.trips.trips});
      // this.setState({trips: data.trips.trips});
      // this.setState({tripCount: data.trips.length});
loadJSON(function(response) {
  // Parse JSON string into object
    var data = JSON.parse(response);
    console.log('data:', data);
 });


      // this.setState({immutableTrips: data.trips.trips});
      // this.setState({trips: data.trips.trips});
      // this.setState({tripCount: data.trips.length});


  



    // FetchTrips.getTrips().then(tripResults => {console.dir(tripResults);
    //   this.setState({trips: tripResults.trips});
    //   this.setState({immutableTrips: tripResults.trips});
    //   this.setState({tripCount: tripResults.trips.length});
    //   this.filterLocale();
    //   this.tripTypes(this.state.trips);
    //   this.setState(this.state);
    // })
  }
  reset() {
    this.setState({trips: this.state.immutableTrips});
    this.filterLocale();
    this.tripTypes(this.state.trips);
    this.setState(this.state);
  }


  filterSearchTerm(term) {console.log('term:"'+term+'"');
    let filteredTrips = filteredTrips.filter(
      trip =>
       `${trip.trip.title} ${trip.trip.destination}`.toUpperCase().indexOf(term.toUpperCase()) >= 0
    );
    this.setState({trips: filteredTrips});
    this.tripTypes(filteredTrips);
  }
  filterActivity(term) {
    let filteredTrips = this.state.trips.filter(
      trip =>
        `${trip.trip.type}`.toUpperCase().indexOf(term.toUpperCase()) >= 0
    );
    this.setState({trips: filteredTrips});
    this.tripTypes(filteredTrips);
  }
  filterPrice(low, high) {
    let filteredTrips = this.state.trips.filter(
        trip => 
          trip.trip.priceLow >= low && trip.trip.priceHigh <= high
      );
      this.setState({trips: filteredTrips});
      this.tripTypes(filteredTrips);
  }
  filterLocale(locale) {
    if (locale === 'domestic') {
      this.filterDomestic('domestic');
    }
    else if (locale === 'international'){
      this.filterInternational('international');
    }
    else {
      this.filterDomestic();
    }
  }
  filterDomestic(locale) {
    let filteredTrips = this.state.trips.filter(
        trip =>
          trip.trip.destination.indexOf('United States') !== -1
      );
      if (locale) {
        this.setState({trips: filteredTrips});
      //  this.tripTypes(filteredTrips);
      }
      this.setState({domestic: filteredTrips.length});
      this.setState({international: this.state.trips.length - filteredTrips.length});
      this.tripTypes(filteredTrips);
  }
  filterInternational(locale) {
    let filteredTrips = this.state.trips.filter(
        trip =>
          trip.trip.destination.indexOf('United States') === -1
      );
      if (locale) {
        this.setState({trips: filteredTrips});
      //  this.tripTypes(filteredTrips);
      }
        this.setState({international: filteredTrips.length});
        this.setState({domestic: this.state.trips.length - filteredTrips.length});
        this.tripTypes(filteredTrips);
  }
  tripTypes(currentTrips) {
    let tripTypes = {};
    let trips = currentTrips || this.state.trips;
    trips.forEach((trip) => {
      let splitTypes = trip.trip.type.split(', ');
      splitTypes.forEach(type => {
        if (type in tripTypes) {
          tripTypes[type]++;
        }
        else {
          tripTypes[type] = 1;
        }
      });
    });
    this.setState({tripTypes: tripTypes});
  }
  render() {console.log(this.state.trips);
    return (
        <div className="App">
          <header>
            <SearchBar onSearch={this.filterSearchTerm}/>
          </header>
          <div className="content">
            <aside>
            <Filter trips={this.state.trips}/>
            </aside>
            <main>
              <TripList trips={this.state.trips}/>
            </main>
          </div>
        </div>
    );
  }
}

export default App;
