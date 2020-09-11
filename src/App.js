import React from 'react';
import './App.css';

import Main from './components/main';
import Login from './components/login';
import fire from './config/firebase';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
      fire.auth().onAuthStateChanged((user) => {
        if(user) 
        {
          this.setState({user})
        }
        else
        {
          this.setState({user: null})
        }
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.user ? (<Main/>) : (<Login/>)}
      </div>
    );
  }
}


// <main>
// <Main />
// </main>

// "rules": {
//   ".read": "auth != null",
//   ".write": "auth != null"
// }