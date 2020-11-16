import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './views/Auth0Test/Landing';
import Auth0Test from './views/Auth0Test';
import Wrapper from './components/Wrapper/Wrapper';
import Challenges from './views/Challenges/Challenges';
import Home from './views/Home/Home'

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Switch>
          <Route path="/" exact component={Auth0Test} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/home" exact component={Home} />
          <Route path="/challenges" exact component={Challenges} />
        </Switch>
      </Wrapper>
    </div>
  );
}

export default App;
