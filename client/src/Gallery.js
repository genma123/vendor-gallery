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
		const galleryItems = this.props.imageNames.map((imageName, k) => <GalleryItem key={k} imageName={imageName}/>);
		return (
			<div className="Gallery">
			{galleryItems}
			</div>
		);
	}
}

export default Gallery;