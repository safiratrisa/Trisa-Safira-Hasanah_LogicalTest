import React, { Component } from 'react';
import axios from 'axios'
import User from './components/userInfo.component'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkUsername = this.checkUsername.bind(this);
    this.state = {
      user: {},
      error: '',
      display_data: false
    }
  }
  checkUsername = () => {
    const username = this.input.value
    axios.get(`http://api.github.com/users/${username}`)
    .then(res => {
      this.setState({
        error: '',
        user: res.data,
        display_data: false
      });
    })
    .catch(err => {
      this.setState({
        user: {},
        error: err.response.data.message,
        display_data: false
      });
    })
  }
  showRepos = (repos) => {
    console.log(repos)
    this.setState({
      display_data: repos
    })
  }
  render() { 
    const error = this.state.error
    const name = this.state.user.name
    let userProfile;
    if (name) {
      userProfile = <User user={this.state.user} display_data={this.state.display_data} showRepos={this.showRepos}/>
    } else if (error) {
      userProfile = <h1>Username Does Not Exist</h1>
    }
    return (
      <div className="frame">
        <div className="input">
          <input
            type="text"
            ref={inputUsername => (this.input = inputUsername)}
            placeholder='Search Github Username...'
          />
          <button onClick={this.checkUsername}>Search</button>
        </div>
        <div className="content">
          {userProfile}
        </div>
      </div>
    );
  }
}
