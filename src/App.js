import React from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Yelp from './util/yelp';

const businesses = [];


class App extends React.Component {
    constructor(props)  {
      super(props);
      this.state = [];
      this.searchYelp.bind(this);

    }

  searchYelp(term,location,sortBy)  {
    Yelp.search(term, location, sortBy).then(business =>  {this.setState({business: businesses})});
  }
  
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        <BusinessList businesses={businesses} /> 
    </div>
    );
  }
}

export default App;
