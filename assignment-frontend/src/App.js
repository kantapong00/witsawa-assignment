import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import Main from './page/Main'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/main" component={Main} />
      </div>
    )
  }
}

export default App