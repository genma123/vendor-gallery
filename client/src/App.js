import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import Gallery from './Gallery';
import _ from 'lodash';

class App extends Component {

  constructor() {
    super();
    const IMAGE_NAMES = [];
    // const IMAGE_NAMES = [ '006-fly.jpg', 'jemmerling.png', 'John_Emmerling-IMAGE.jpg', 'test2.jpg' ];
    this.state = {
	  update : 0,
	  booth: "",
	  errmsg: "",
      imageNames: IMAGE_NAMES,
	  modalIsOpen: true	//Modal stuff
    };
	
	//Modal stuff:
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	//End Modal stuff
	
	this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  //Modal stuff:
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
	console.log("errmsg is: " + this.state.errmsg);
  }

  closeModal() {
	this.setState({modalIsOpen: false});
	this.retrieve();
  }
  //End Modal stuff
  
  submitLoginForm() {
	const registeredBooths = [ 'lsedesigns', 'mantiques' ];
	// var found = _.find(registeredBooths, this.state.booth);
	var found = registeredBooths.indexOf(this.state.booth);
	console.log("found: " + found);
 	if (found < 0) {
		this.setState({errmsg: "Incorrect User Name or Password"});
 	} else {
		this.closeModal();
	}
	console.log("I am here, message: " + this.state.errmsg);
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
		var booth = event.target.value;
	  console.log("picked booth: " + event.target.value);
	  this.setState({ booth: event.target.value});
  }
  
  render() {
    return (
      <div className="App">
	    <p>
            <button onClick={() => this.retrieve()}>Retrieve from AWS</button>  
 		</p>
		{/*<p>
			<select id="booth" onChange={this.selectBooth.bind(this)}>
				<option value="lsedesigns">Lisa</option>
				<option value="mantiques">Mantiques</option>
			</select>
		</p>
		<p>
			<button onClick={this.openModal}>Open Modal</button>
		</p>*/}
		<p>
			<Modal
			  isOpen={this.state.modalIsOpen}
			  onAfterOpen={this.afterOpenModal}
			  onRequestClose={this.closeModal}
			  shouldCloseOnOverlayClick={false}
			  className="AppModal-content"
			  overlayClassName="AppModal-overlay"
			  contentLabel="Example Modal"
			>

			  <h2 ref="subtitle">Please Log In</h2>
			  <div className="App-message">{this.state.errmsg}</div>
			  <form>
				<div className="AppModal-div">
					<label>User Name:
						<input onBlur={this.selectBooth.bind(this)} />
					</label>
				</div>
				<div className="AppModal-div">
					<label>Password:
						<input type="password" />
					</label>
				</div>
				{/*<button>tab navigation</button>
				<button>stays</button>
				<button>inside</button>
				<button>the modal</button>*/}
			  </form>
				<button onClick={this.submitLoginForm}>Submit</button>
			</Modal>
		</p>
		<Gallery imageNames={this.state.imageNames} booth={this.state.booth} />
     </div>
    );
  }
}

export default App;
