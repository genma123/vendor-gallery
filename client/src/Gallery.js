import React, { Component } from 'react';
import GalleryItem from './GalleryItem';
import './Gallery.css';

class Gallery extends Component {	

	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
		// console.log("in Gallery.shouldComponentUpdate, update: " + this.props.update);
		return this.props.update;
	}
  
	render() {
		return (
			<div className="Gallery">
			{this.props.imageNames.map((imageName, k) => { return <p><GalleryItem key={k} imageName={imageName} update={this.props.update} /></p>; } )}
			</div>
		);
	}
}

export default Gallery;