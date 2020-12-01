import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StoreProvider } from './state/GlobalState';

import './App.css';

import Login from './views/Login/Login';
import AboutView from './views/AboutView/AboutView'
import Challenged from './views/Challenged/Challenged';
import Community from './views/Community/Community'
import Home from './views/Home/Home'
import Wrapper from './components/Wrapper/Wrapper';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Wrapper>
          <Header />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/about" exact component={AboutView} />
            <Route path="/challenged" exact component={Challenged} />
            <Route path="/community" exact component={Community} />
            <Route path="/home" exact component={Home} />
          </Switch>
          <Footer />
        </Wrapper>
      </StoreProvider>
    </div>
  );
}

export default App;
