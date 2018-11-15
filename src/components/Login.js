import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux'
import {userLoggedIn} from '../ducks/reducer'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    } 

    handleClick = () => {
        Axios.post('/auth/login', this.state).then(res => {
            let user = res.data
            this.props.userLoggedIn(user)
        })
    }    

    render(){
        return this.props.isAuthenticated ?
        <Redirect to='/'/> :
        <div>
            <h1>Login</h1>
            <input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.handleChange}/>
            <input type='text' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange}/>
            <button onClick={this.handleClick}>Submit</button>
        </div>
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps, { userLoggedIn })(Login)