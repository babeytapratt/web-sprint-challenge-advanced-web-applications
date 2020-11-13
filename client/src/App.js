import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import axiosWithAuth from './components/utils/axiosWithAuth'
import PrivateRoute from './components/PrivateRoute'
import ColorList from './components/ColorList'
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    axiosWithAuth()
      .post("/logout")
      .then(req=>{
        localStorage.removeItem("token");
        setLoggedIn(false);
      })
      .catch(err=>{
        console.log(err);
      })
  };

  return (
    <Router>
      <div className="App">
        <ul>
          { (!isLoggedIn) ? (<li> <Link to="/login">Login</Link></li>) : (<div></div>) }
          <li>
            <Link to="#" onClick={logout}>Logout</Link>
          </li>
          { (isLoggedIn) ? (<li> <Link to="/color-list">color List Page</Link></li>) : (<div></div>) }
        </ul>

        <Switch>
          <PrivateRoute exact path="/color-list" component={ColorList} />
          <Route path="/login" render={(props)=>{
            return <Login {...props} setLogedIn={setLoggedIn} />
          }} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
