import React, { Component } from 'react';
import './GalleryItem.css';

class GalleryItem extends Component {
	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
		return this.props.imageName !== nextProps.imageName;
	}
  
	render() {
		console.log("rendering " + process.env.PUBLIC_URL + this.props.imageName);
		return <img src={process.env.PUBLIC_URL +this.props.imageName} className="GalleryItem-image" />;
	}
}

export default GalleryItem;