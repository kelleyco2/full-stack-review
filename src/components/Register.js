import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux'
import {userLoggedIn} from '../ducks/reducer'
import { Redirect } from 'react-router-dom'

class Register extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
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
        Axios.post('/auth/register', this.state).then(res => {
            let user = res.data
            this.props.userLoggedIn(user)
        })
    }    

    render(){
        return this.props.isAuthenticated ?
        <Redirect to='/'/> :
        <div>
            <h1>Registration</h1>
            <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.handleChange}/>
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

export default connect(mapStateToProps, { userLoggedIn })(Register)