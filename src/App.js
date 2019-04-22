import React, { Component } from 'react';
import AppProvider from "./store/AppProvider"

import Editor from './components/Editor'

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Editor {...this.state} />
      </AppProvider>
    );
  }
}

export default App;
