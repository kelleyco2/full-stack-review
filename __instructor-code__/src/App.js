import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom'
import Posts from './components/Posts'
import Login from './components/Login'
import Register from './components/Register'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

export default App;
