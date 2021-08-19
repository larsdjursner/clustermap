import React, { useState } from "react";
import { Counter } from "./components/counter/Counter";
import "./App.css";
import ReactMap from "./components/map/ReactMap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LocationPage from "./components/location/LocationPage";
import fire from "./fire";
import Login from "./components/sessions/SignIn";
import SignIn from "./components/sessions/SignIn";
import SignUp from "./components/sessions/SignUp";

function App() {
  // const [isAuth, setIsAuth] = useState(false);

  // fire.auth().onAuthStateChanged((user) => {
  //   return user ? setIsAuth(true) : setIsAuth(false);
  // });

  // console.log("logged in?", isAuth);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <h3>landing page</h3>
            <div>
              <Link to="/map">go to map</Link>
            </div>
            <div>
              <Link to="/counter">go to counter</Link>
            </div>
          </Route>
          <Route exact path="/map" component={ReactMap} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/locations/:id" component={LocationPage} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
