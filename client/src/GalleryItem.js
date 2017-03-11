import React, { Component } from 'react';
import './GalleryItem.css';

class GalleryItem extends Component {
	shouldComponentUpdate(nextProps, nextState) {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
		// console.log("in GalleryItem.shouldComponentUpdate");
		return true;
	}
  
	render() {
		// console.log("re-rendering gallery item, substring: " + this.props.imageName.substring(0,5));
		// var ss = this.props.imageName.substring(0,5);
		var imgn = /* ss === "test2" ? ss + "_" + this.props.update + ".jpg" : */ this.props.imageName;
		return <img src={process.env.PUBLIC_URL + imgn} className="GalleryItem-image" />;
	}
}

export default GalleryItem;