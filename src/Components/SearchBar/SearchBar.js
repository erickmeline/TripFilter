import React from 'react';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}
	handleChange(event) {
		if (event.target.value.length > 0) {
			this.setState({value: event.target.value});
			this.props.onSearch(event.target.value);
		}
	}
	search() {
		this.props.onSearch(this.state.value);
	}
	render() {
		return (
			<form>
				<input onChange={this.handleChange} placeholder="Search"/>
				<button onClick={this.search}>SEARCH</button>
			</form>
		)
	}
}

export default SearchBar;
