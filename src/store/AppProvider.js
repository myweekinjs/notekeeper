import React, { Component } from "react"
import AppContext from "./AppContext"

import Firebase from "../api/Firebase"

class AppProvider extends Component {
  firebase = new Firebase()
  authListner = null

  state = {
    user: null,
    loading: true
  }

  componentDidMount = async () => {
    this.authListner = this.firebase.auth.onAuthStateChanged((user) => {
      this.setState({
        user: user,
        loading: false
      })
    })
  }

  componentWillUnmount = () => {
    this.authListner = null
  }

  render() {
    return (
      <AppContext.Provider
        value={{...this.state}}
      >
        { this.props.children }
      </AppContext.Provider>
    )
  }
}

export default AppProvider
