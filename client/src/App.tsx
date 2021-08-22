import React, { useState } from "react";
import { Counter } from "./components/counter/Counter";
import "./App.css";
import ReactMap from "./components/map/ReactMap";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LocationPage from "./components/location/LocationPage";
import fire from "./fire";
import SignIn from "./components/sessions/SignIn";
import SignUp from "./components/sessions/SignUp";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuth } from "./components/sessions/AuthSlice";
import NavBar from "./components/nav/NavBar";
import NavItem from "./components/nav/NavItem";
import { ReactComponent as MenuIcon } from "./icons/Menu.svg";
import { ReactComponent as CogIcon } from "./icons/Cog.svg";
import { ReactComponent as GlobeIcon } from "./icons/Globe.svg";
import { ReactComponent as AccountIcon } from "./icons/Account.svg";
import DropdownMenu from "./components/nav/DropdownMenu";

function App() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <Router>
        <NavBar>
          <NavItem
            icon={
              <Link to="/map">
                <GlobeIcon className="w-5 h-5  text-gray-200" />
              </Link>
            }
          />
          <NavItem icon={<MenuIcon className="w-5 h-5  text-gray-200" />} />
          <NavItem icon={<AccountIcon className="w-5 h-5  text-gray-200" />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </NavBar>
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
          <Route
            exact
            path="/signin"
            render={() => (!auth.isAuth ? <SignIn /> : <Redirect to="/" />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (!auth.isAuth ? <SignUp /> : <Redirect to="/" />)}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
