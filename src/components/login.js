import React from 'react';
import fire from '../config/firebase';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })
  }

  handleChange(e) {
    this.setState({
     [e.target.name] : e.target.value
    })
  }

  signUp(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => {
      console.log(u)
    }).catch((e) =>{
      console.log(e)
    })
  }

  render() {
    return (
      <div className="form-login">
        <form className="form-login-input">
          <input
          name='email'
          type='email'
          id='email'
          placeholder='enter email here'
          onChange={this.handleChange}
          value={this.state.email}
          />
          <input
          name='password'
          type='password'
          id='password'
          onChange={this.handleChange}
          placeholder='enter password'
          value={this.state.password}
          />
          <button type='button' onClick={this.login}>login</button>
          <button type='button' onClick={this.signUp}>SignUp</button>
        </form>
        <div className="section-two">
          <div className="welcome">
            Private Notes...
          </div>
          <div className="about">
            Create an Account to get started,
          </div>

        </div>
      </div>
    )
  }
}

          // <div className="warning">
          //   but save password somewhere this site doesn't retreave passwords
          // </div>