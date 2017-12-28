import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 

  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render() {
    return (
      <div className='App'>
        {
          this.state.user ?
          <div>
            <h2 style={{color:'white'}}>สวัสดีคุณ {this.state.user.displayName}</h2>
            <div className="profile">
              <img className="img" width="250px" src={this.state.user.photoURL} />
            </div>
          </div>
          :
          <div className='wrapper'>
            <p style={{color:'white'}}>กรุณาล็อกอินเพื่อเข้าสู่ระบบ</p>
            <center>
              <div className="default">
              </div>
            </center>
          </div>
        }
          <div className="wrapper">
            {this.state.user ?
              <button className="button-logout" onClick={this.logout}>ออกจากระบบ</button>                
              :
              <button className="button-login" onClick={this.login}>เข้าสู่ระบบ</button>              
            }
          </div>
    </div>
    );
  }
}

export default App;
