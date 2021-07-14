import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import ReactMap from "./features/map/ReactMap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
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
          <Route exact path="/locations/:id">
            <div>hey</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
