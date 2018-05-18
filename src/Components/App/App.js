import React from 'react';
import './App.css';
import FetchData from '../../util/FetchTrips.js';
import TripList from '../TripList/TripList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Sidebar from '../Sidebar/Sidebar.js';
import Filter from '../Filter/Filter.js';

const endpoint = 'https://content.sierraclub.org/outings/search.json';
const proxy = 'https://cors-anywhere.herokuapp.com';
let url = `${proxy}/${endpoint}`; // production data
url = './trips.json'; // local testing data

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getTrips(url); // get the ball rolling asap
    this.state = { // set initial state
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
      international: 0
    };
    this.getTrips = this.getTrips.bind(this);
    this.reset = this.reset.bind(this);
    this.filterSearchTerm = this.filterSearchTerm.bind(this);
    this.filterActivity = this.filterActivity.bind(this);
    this.filterPrice = this.filterPrice.bind(this);
    this.filterLocale = this.filterLocale.bind(this);
  }
  getTrips(url) {
    FetchData.getData(url).then(tripResults => {
      this.setState({immutableTrips: tripResults.trips},function(){
        this.reset();
      });
    });
  }
  reset() {
    this.setState({trips: this.state.immutableTrips},function(){
      this.setState({tripCount: this.state.trips.length},function(){
        this.setState({domesticCount: Filter.filterLocale(this.state.trips,'domestic').length},function(){
          this.setState({internationalCount: this.state.tripCount - this.state.domesticCount});
        });
      });
      this.setState({tripTypes: Filter.filterTypes(this.state.trips,this.state.immutableTrips)});
      this.setState({filteredTrips: this.state.trips});
    });
  }
  filterSearchTerm(term) {
    this.setState({trips: Filter.filterSearchTerm(this.state.trips,term)},function(){
      this.setState({tripTypes: Filter.filterTypes(this.state.trips,this.state.immutableTrips)});
      this.setState({domesticCount: Filter.filterLocale(this.state.trips,'domestic').length});
      this.setState({internationalCount: Filter.filterLocale(this.state.trips,'international').length});
      this.setState({filteredTrips: this.state.trips});
      console.dir(this.state.trips);
    });
  }
  filterActivity(term) {
    this.setState({trips: Filter.filterActivity(this.state.trips,term)},function(){
      this.setState({tripTypes: Filter.filterTypes(this.state.trips,this.state.immutableTrips)});
      this.setState({domesticCount: Filter.filterLocale(this.state.trips,'domestic').length});
      this.setState({internationalCount: Filter.filterLocale(this.state.trips,'international').length});
      this.setState({filteredTrips: this.state.trips});
      console.dir(this.state.trips);
    });
  }
  filterLocale(locale) {
    this.setState({trips: Filter.filterLocale(this.state.filteredTrips,locale)},function(){
      this.setState({tripTypes: Filter.filterTypes(this.state.trips,this.state.immutableTrips)});
      this.setState({domesticCount: Filter.filterLocale(this.state.trips,'domestic').length});
      this.setState({internationalCount: Filter.filterLocale(this.state.trips,'international').length});
      this.setState({filteredTrips: this.state.trips});
      console.dir(this.state.trips);
    });
  }
  filterPrice(low,high) {
    this.setState({trips: Filter.filterPrice(this.state.filteredTrips,low,high)},function(){
      this.setState({tripTypes: Filter.filterTypes(this.state.trips,this.state.immutableTrips)});
      this.setState({domesticCount: Filter.filterLocale(this.state.trips,'domestic').length});
      this.setState({internationalCount: Filter.filterLocale(this.state.trips,'international').length});
      console.dir(this.state.trips);
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <SearchBar onSearch={this.filterSearchTerm}/>
        </header>
        <div className="content">
          <aside>
            <Sidebar 
            trips={this.state.trips} 
            activities={this.state.tripTypes} 
            total={this.state.tripCount} 
            domestic={this.state.domesticCount} 
            international={this.state.internationalCount} 
            onClickActivity={this.filterActivity} 
            onClickPrice={this.filterPrice} 
            onClickLocale={this.filterLocale} 
            onReset={this.reset}/>
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
