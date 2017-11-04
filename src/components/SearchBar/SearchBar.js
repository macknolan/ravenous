import React from 'react';
import './SearchBar.css';

const sortByOptions =  {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count',
}

class SearchBar extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
            term:'',
            location:'',
            sortBy:'best_match'
        };
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocatioChange = this.handleLocatioChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    renderSortByOptions()   {
        return Object.keys(sortByOptions).map(sortByOption => {
            let sortByOptionsValue = sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this)} className={this.getSortByClass(sortByOption)} key={sortByOptionsValue}>{sortByOption}</li>
        });
    }

    getSortByClass(sortByOption)    {
        if(this.state.sortBy === this.sortByOptions) {
            return 'active';
        }   else {
            return '';
        }
    }

    handleSortByChange(sortByOption)    {
        this.setState({ sortBy: this.sortByOption });
    }

    handleTermChange(event)  {
        this.setState({ term: event.target.value})
    }

    handleLocatioChange(event)   {
        this.setState({ location: event.target.value })
    }

    handleSearch(event)  {
        this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy);
        event.preventDefault();
    }



    render()    {
        return(
            <div className="SearchBar">
            <div className="SearchBar-sort-options">
              <ul>
                {this.renderSortByOptions()}
              </ul>
            </div>
            <div className="SearchBar-fields">
              <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
              <input placeholder="Where?" onChange={this.handleLocatioChange}/>
            </div>
            <div className="SearchBar-submit">
              <a onClick={this.handleSearch}>Let's Go</a>
            </div>
          </div>

        );
    }
};

export default SearchBar;