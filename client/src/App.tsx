import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StoreProvider } from './state/GlobalState';

import './App.css';

import Login from './views/Login/Login';
// import Challenges from './views/Challenges/Challenges';
import Challenged from './views/Challenged/Challenged';
import Community from './views/Community/Community'
import Home from './views/Home/Home'
import Landing from './views/Login/Landing';
import PlantLog from './views/PlantLog/PlantLog';
import Register from './views/Register/Register';
import Wrapper from './components/Wrapper/Wrapper';
import KeithTestGrid from './views/KeithTestGrid/KeithTestGrid'
// import Winner from './views/Winner/Winner';
// import GameBoard from './views/GameBoard/GameBoard';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
        <StoreProvider>
          <Wrapper>
            <Header />
            {/* <div className="dark-box"> */}
              <Switch>
                <Route path="/keith-dev" exact component={KeithTestGrid} />
                <Route path="/" exact component={Login} />
                <Route path="/challenged" exact component={Challenged} />
                {/* <Route path="/challengeDetail" exact component={ChallengeDetail} /> */}
                <Route path="/community" exact component={Community} />
                <Route path="/home" exact component={Home} />
                <Route path="/landing" exact component={Landing} />
                <Route path="/plant-log" exact component={PlantLog} />
                <Route path="/register" exact component={Register} />
                {/* <Route path="/winner" exact component={Winner} /> */}
                {/* <Route path="/game-board" exact component={GameBoard} /> */}
              </Switch>
            {/* </div> */}
            <Footer />
          </Wrapper>
        </StoreProvider>
    </div>
  );
}

export default App;
