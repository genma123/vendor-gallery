import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Gallery from './Gallery';

class App extends Component {

  constructor() {
    super();
    const IMAGE_NAMES = [ '006-fly.jpg', 'jemmerling.png', 'John_Emmerling-IMAGE.jpg', 'test2.jpg' ];
    this.state = {
	  update : 0,
      imageNames: IMAGE_NAMES
    };
  }

  retrieve() {
	  // console.log("clicking button, " + JSON.stringify(this.state));
	  var app = this;
	  return fetch(`api/images`)
	  .then(function(res) {
		  // console.log(this.getState());
		  var update = 1 - app.state.update;
		  app.setState({ update: update });
		  return res.json();
	  }).then(function(data) {
		  console.log("clicked that button: " + data);
		  app.setState({ imageNames: data });
		  // console.log("clicked that BUTTON, state: " + JSON.stringify(app.state));
	  });
	  ;
  }
  
  render() {
    return (
      <div className="App">
	  {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, Dude!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
	  </p> */}
	    <p>
            <button onClick={() => this.retrieve()}>Retrieve from AWS</button>  
 		</p>
		<Gallery imageNames={this.state.imageNames} update={this.state.update} />
     </div>
    );
  }
}

/*
function search(query, cb) {
  return fetch(`api/food?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
*/

export default App;
