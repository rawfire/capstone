import React from 'react';
// import Login from './login';
// import {Link} from 'react-router'

export default class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <button onClick={this.props.logOut}>Log Out</button>
      </div>
    )
  }
}