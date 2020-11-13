import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Auth0Test/Login';
import Landing from './components/Auth0Test/Landing';
import Auth0Test from './pages/Auth0Test';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Auth0Test} />
        <Route path="/landing" exact component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
