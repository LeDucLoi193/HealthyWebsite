import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/menu/Login';
import Home from './components/menu/Home';
import HealthInfo from './components/menu/HealthInfo';
import LoangXuong from './components/data/LoangXuong';
import ViemPhoi from './components/data/ViemPhoi';
import Gout from './components/data/Gout';
import Chart from './components/menu/Chart';

import {LoginContext} from './contexts/login';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import VPXetNghiem from './components/data/VPXetNghiem';

function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <Router>
      <LoginContext.Provider value={[isLogin, setIsLogin]}>
        <div>
          <Switch>
            <Route exact path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/health-info" >
              <HealthInfo />
            </Route>
            <Route path='/input-data/loang-xuong'>
              <LoangXuong />
            </Route>
            <Route path='/input-data/viem-phoi'>
              <ViemPhoi />
            </Route>
            <Route path='/input-data/viem-phoi-xn'>
              <VPXetNghiem />
            </Route>
            <Route path='/input-data/gout'>
              <Gout />
            </Route>
            <Route path='/chart'>
              <Chart />
            </Route>
            <Route exact path="/">
              {
                isLogin ? <Home /> : <Redirect to="/sign-in" />
              }
            </Route>
          </Switch>
        </div> 
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
