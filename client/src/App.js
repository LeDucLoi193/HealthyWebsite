import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/menu/Login';
import Home from './components/menu/Home';
import Navbar from './components/menu/Navbar';
import HealthInfo from './components/menu/HealthInfo';
import LoangXuong from './components/data/LoangXuong';
import ViemPhoi from './components/data/ViemPhoi';
import Gout from './components/data/Gout';
import Chart from './components/menu/Chart';

import { AdminContext, LoginContext } from './contexts/login';
import { UpdateChartContext } from './contexts/update';

import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import VPXetNghiem from './components/data/VPXetNghiem';
import Admin from './components/admin/Admin';

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [updateChart, setUpdateChart] = useState(false)

  return (
    <Router>
      <LoginContext.Provider value={[isLogin, setIsLogin]}>
        <UpdateChartContext.Provider value={[updateChart, setUpdateChart]}>
          <AdminContext.Provider value={[admin, setAdmin]}>
            {
              isLogin && <Navbar />
            }
            <Switch>
              <Route exact path="/admin">
                <Admin />
              </Route>
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
                <Home />
              </Route>
            </Switch>
          </AdminContext.Provider>
        </UpdateChartContext.Provider>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
