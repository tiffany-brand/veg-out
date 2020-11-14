import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Auth0Test/Landing';
import Auth0Test from './pages/Auth0Test';
import Wrapper from './components/Wrapper/Wrapper';
import Canvas from './components/Canvas/Canvas';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Switch>
          <Route path="/" exact component={Auth0Test} />
          <Route path="/landing" exact component={Landing} />
        </Switch>
      </Wrapper>
    </div>
  );
}

export default App;
