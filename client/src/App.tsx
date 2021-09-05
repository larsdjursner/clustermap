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
import Location from "./components/location/Location";
import SignIn from "./components/sessions/SignIn";
import SignUp from "./components/sessions/SignUp";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuth } from "./components/sessions/AuthSlice";
import NavBar from "./components/nav/NavBar";
import NavItem from "./components/nav/NavItem";
import DropdownMenu from "./components/nav/DropdownMenu";
import { GlobeIcon, MenuIcon } from "@heroicons/react/outline";
import ForgotPassword from "./components/sessions/ForgotPassword";
import fire from "./fire";

function App() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  
  // fire.auth().curre

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
          <NavItem icon={<MenuIcon className="w-5 h-5  text-gray-200" />}>
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
              <Link to="/counter">go to counter, placeholder</Link>
            </div>
          </Route>
          <Route exact path="/map" component={ReactMap} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/locations/:id" component={Location} />
          <Route
            exact
            path="/signin"
            render={() => (auth.isAuth ? <Redirect to="/" /> : <SignIn />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (auth.isAuth ? <Redirect to="/" /> : <SignUp />)}
          />
          <Route exact path="/resetpassword" component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
