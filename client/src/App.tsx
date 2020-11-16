import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './views/Auth0Test/Landing';
import Auth0Test from './views/Auth0Test';
import Wrapper from './components/Wrapper/Wrapper';
import SocketTest from './views/Socket/SocketTest';
import Challenges from './views/Challenges/Challenges';
import Home from './views/Home/Home'

function App() {
  return (

      <Wrapper>

        <Switch>
          <Route path="/" exact component={Auth0Test} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/socket" exact component={SocketTest} />
          <Route path="/home" exact component={Home} />
          <Route path="/challenges" exact component={Challenges} />
        </Switch>
      </Wrapper>
    
  );
}

export default App;
