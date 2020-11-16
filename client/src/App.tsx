import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './views/Auth0Test/Landing';
import Auth0Test from './views/Auth0Test';
import Wrapper from './components/Wrapper/Wrapper';
import Keith from './views/KeithTest'
import SocketTest from './views/Socket/SocketTest';

function App() {
  return (

      <Wrapper>

        <Switch>
          <Route path="/" exact component={Auth0Test} />
          <Route path="/landing" exact component={Landing} />
          <Route path="/keith-dev-test" exact component={Keith} />
          <Route path="/socket" exact component={SocketTest} />
        </Switch>
      </Wrapper>
    
  );
}

export default App;
