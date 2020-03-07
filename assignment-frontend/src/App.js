import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App