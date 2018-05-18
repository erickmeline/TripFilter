import React from 'react';

const baseUrl = 'https://content.sierraclub.org';

class Trip extends React.Component {
	constructor(props) {
		super(props);
		this.getCost = this.getCost.bind(this);
		this.getCost = this.getCost.bind(this);
	}
	getCost() {
		if (this.props.trip.priceLow === this.props.trip.priceHigh) {
			return ('$' + this.props.trip.priceLow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		}
		return ('$' + this.props.trip.priceLow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' - $' + this.props.trip.priceHigh).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render() {
		return (
			<li key={this.props.trip.id}>
				<a className="card" href={baseUrl + this.props.trip.path}>
					<div className="imageContainer">
						<div className="image" style={{backgroundImage: `url(${this.props.trip.image.src})`}} alt={this.props.trip.image.alt}></div>
					</div>
					<article>
						<h1>{this.props.trip.title}</h1>
						<p>
						<span>{this.getCost()}</span> | <span>{this.props.trip.dates}</span>
						</p>
					</article>
				</a>
			</li>
		);
	}
}

export default Trip;
