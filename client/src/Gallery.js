import React, { Component } from 'react';
import GalleryItem from './GalleryItem';
import './Gallery.css';

class Gallery extends Component {	

	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
		console.log("in Gallery.shouldComponentUpdate, booth: " + this.props.booth);
		return this.props.update !== nextProps.booth;
	}
  
	render() {
		return (
			<div className="Gallery">
			{this.props.imageNames.map((imageName, k) => { return <p><GalleryItem key={k} imageName={imageName}/></p>; } )}
			</div>
		);
	}
}

export default Gallery;