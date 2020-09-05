import React from 'react';
import fire from '../config/firebase';
import Header from './header';
import Notes from './notes';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.logOut =this.logOut.bind(this)
  }

  logOut() {
    fire.auth().signOut()
  }

  render() {
    return (
      <div>
        <Header logOut={this.logOut}/>
        <Notes />
      </div>
    )
  }
}


//         <button onClick={this.logOut}>LogOut</button>

// <section className='notes-section'>
// Notes.js Compoenent goes here with notecards.js 
// </section>
// <section className='todo-section'>
// todos.js goes here with todo.js
// </section>