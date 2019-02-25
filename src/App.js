import React, { Component } from 'react';
import FormManagement from './components/FormManagement'
import FormBuilder from './components/FormBuilder'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <FormManagement  />
        <FormBuilder />
      </div>
    );
  }
}

export default App;
