import React, { Component } from 'react';

import './App.css';
import firebase from './firebase.js';

class App extends Component {
	
	constructor() {
    super();
    this.state = {
      message: '',
      username: '',
	  items: []
    }
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this); // <-- add this line
  }
	
	
  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Message box</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className="add-item">
			  <form onSubmit={this.handleSubmit}>
				  <input type="text" name="username" placeholder="Username:" onChange={this.handleChange} value={this.state.username} />
				  <input type="text" name="message" placeholder="Message:" onChange={this.handleChange} value={this.state.message} />
				  <button>Message</button>
			  </form>
			</section>
          <section className='display-item'>
		  <div className="wrapper">
			<ul>
			  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>By: {item.user}</h3>
                        <p>Message: {item.message}
                          <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                        </p>
                      </li>
                    )
                  })}
			</ul>
		  </div>
		</section>
        </div>
      </div>
    );
  }
  
  handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
  }
  handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('items');
  const item = {
    message: this.state.message,
    user: this.state.username
  }
  itemsRef.push(item);
  this.setState({
    message: '',
    username: ''
  });
}
 
 componentDidMount() {
  const itemsRef = firebase.database().ref('items');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        message: items[item].message,
        user: items[item].user
      });
    }
    this.setState({
      items: newState
    });
  });
}
 removeItem(itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`);
  itemRef.remove();
}
 
}
export default App;
