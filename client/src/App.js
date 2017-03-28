import React, { Component } from 'react';
import './App.css';
import Gallery from './Gallery';

class App extends Component {

  constructor() {
    super();
    const IMAGE_NAMES = [ '006-fly.jpg', 'jemmerling.png', 'John_Emmerling-IMAGE.jpg', 'test2.jpg' ];
    this.state = {
	  update : 0,
	  booth: "mantiques",
      imageNames: IMAGE_NAMES
    };
  }

  retrieve() {
	  // console.log("clicking button, " + JSON.stringify(this.state));
	  var app = this;
	  return fetch(`api/images?booth=${this.state.booth}`)
	  .then(function(res) {
		  return res.json();
	  }).then(function(data) {
		  console.log("clicked that button: " + data);
		  app.setState({ imageNames: data });
		  // console.log("clicked that BUTTON, state: " + JSON.stringify(app.state));
	  });
	  ;
  }
  
  selectBooth(event) {
	  console.log("picked booth: " + event.target.value);
	  this.setState({ booth: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
	    <p>
            <button onClick={() => this.retrieve()}>Retrieve from AWS</button>  
 		</p>
		<p>
			<select id="booth" onChange={this.selectBooth.bind(this)}>
				<option value="lsedesigns">Lisa</option>
				<option value="mantiques">Mantiques</option>
			</select>
		</p>
		<Gallery imageNames={this.state.imageNames} booth={this.state.booth} />
     </div>
    );
  }
}

export default App;
