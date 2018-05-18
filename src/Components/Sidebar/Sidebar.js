import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({showFilters: true});
	}
	handleClick(term) {
		this.props.onClickActivity(term);
	}
	handleReset() {
		this.props.onReset();
	}
	handleLocaleClick(locale) {
		this.props.onClickLocale(locale);
	}
	handlePriceClick(low,high) {
		this.props.onClickPrice(low,high);
	}
	filters() {
		this.setState({showFilters: !this.state.showFilters});
	}
	render() {
		let filter = this.state.showFilters ? 'filters' : 'filters collapse';
		let pointer = this.state.showFilters ? 'pointer-down' : 'pointer';
		return (
			<div className="filter">
				<h2><span className={pointer} onClick={this.filters}></span>Filter Available Trips</h2>
				<div className={filter}>
					<section>
						<h3>Locale</h3>
						<ul>
							<li key="01" onClick={() => this.handleReset()}>All Trips ({this.props.total})</li>
							<li key="02" onClick={() => this.handleLocaleClick('domestic')}>United States ({this.props.domestic})</li>
							<li key="03" onClick={() => this.handleLocaleClick('international')}>International ({this.props.international})</li>
						</ul>
					</section>
					<section>
						<h3>Activities</h3>
						<ul>
							{Object.keys(this.props.activities).map((key,i) => 
								<li key={i} onClick={() => this.handleClick(key)}>
								{key} ({this.props.activities[key]})
								</li>
							)}
						</ul>
					</section>
					<section>
						<h3>Price Range</h3>
						<ul>
						<li onClick={() => this.handlePriceClick(0,1000)}>
							Up to $1,000 per person
						</li>
						<li onClick={() => this.handlePriceClick(1000,3000)}>
							$1,000 - $3,000 per person
						</li>
						<li onClick={() => this.handlePriceClick(3000,10000)}>
							$3,000 and above
						</li>
						</ul>
					</section>
				</div>
			</div>
		)
	}
}

export default Sidebar;
