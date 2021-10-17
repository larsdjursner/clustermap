import "./App.css";
import ReactMap from "./components/map/ReactMap";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Location from "./components/location/Location";
import SignIn from "./components/sessions/SignIn";
import SignUp from "./components/sessions/SignUp";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuth, setAuth, User } from "./components/sessions/AuthSlice";
import NavBar from "./components/nav/NavBar";
import fire from "./fire";
import { clear } from "./components/map/ReactMapSlice";
import ForgotPassword from "./components/sessions/ForgotPassword";
import LandingPage from "./components/landing/LandingPage";
import Settings from "./components/sessions/Settings";
import Account from "./components/sessions/Account";

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

      currentLoggedInUser.getIdToken().then((res) => {
        if (localStorage.getItem("jwt")) {
          localStorage.setItem("jwt", res);
          return;
        }
        sessionStorage.setItem("jwt", res);
        return;
      });
    }
  });

  return (
    <div className="w-full h-full">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/map" component={ReactMap} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/account" component={Account} />
          <Route path="/locations/:id" component={Location} />
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
