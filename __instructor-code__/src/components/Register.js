import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { userLoggedIn } from '../redux/reducer'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }

  handleChange = e => {
    let { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleClick = () => {
    axios.post('/auth/register', this.state).then(response => {
      let user = response.data
      this.props.userLoggedIn(user)
    }).catch(err => {
      console.log(err.response)
      this.setState({
        error: err.response.data
      })
    })
  }

  render() {
    return this.props.isAuthenticated ? 
    <Redirect to="/"/> :
    <div>
      <h1>Registration</h1>
      <input 
        type="text" 
        name="name" 
        placeholder="name" 
        value={this.state.name} 
        onChange={this.handleChange} />
      <input 
        type="text" 
        name="email" 
        placeholder="email" 
        value={this.state.email} 
        onChange={this.handleChange} />
      <input 
        type="text" 
        name="password" 
        placeholder="password" 
        value={this.state.password} 
        onChange={this.handleChange} />
      <button onClick={this.handleClick}>submit</button>
      {this.state.error}
    </div>
  }
}

function mapStateToProps(state) {
  let { isAuthenticated } = state
  return {
    isAuthenticated
  }
}

export default connect(mapStateToProps, { userLoggedIn })(Register)