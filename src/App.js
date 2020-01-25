import React from 'react';
import FormManagement from './components/FormManagement'
import FormBuilder from './components/FormBuilder'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

function Index() {
  return <h2>Dynamic Form</h2>;
}

function About() {
  return <h2>Sample Dynamic Form App v1.1</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/formManagement/">Sample Form</Link>
            </li>
            <li>
              <Link to="/formBuilder/">Form Builder</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/formManagement/" component={FormManagement} />
        <Route path="/formBuilder/" component={FormBuilder} />
      </div>
    </Router>
  );
}


export default App;
