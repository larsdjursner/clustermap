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
import {
  selectAuth,
  setAuth,
  User,
} from "./components/sessions/AuthSlice";
import NavBar from "./components/nav/NavBar";
import fire from "./fire";
import { clear } from "./components/map/ReactMapSlice";
import ForgotPassword from "./components/sessions/ForgotPassword";
// import NavBar from "./components/nav/NewNavBar";

function App() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  fire.auth().onAuthStateChanged((currentLoggedInUser) => {
    if (currentLoggedInUser && !auth.isAuth) {
      const user: User = {
        id: currentLoggedInUser.uid,
        email: currentLoggedInUser.email,
        displayName: currentLoggedInUser.displayName,
      };
      dispatch(clear());
      dispatch(setAuth({ user }));

      currentLoggedInUser
        .getIdToken()
        .then((res) => localStorage.setItem("jwt", res));

      return;
    }
  });

  return (
    <div className="App">
      <Router>
        <NavBar />
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
