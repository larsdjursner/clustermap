import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import fire from "../../fire";
import Logo from "../logo/Logo";
import { clear } from "../map/ReactMapSlice";
import { setAuth, User } from "./AuthSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordExtra, setPasswordExtra] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordExtra === password) {
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const _user = userCredential.user;
          if (_user) {
            _user.updateProfile({
              displayName: `${firstName} ${lastName}`,
            });
            if (_user) {
              const user: User = {
                id: _user.uid,
                email: _user.email,
                displayName: _user.displayName,
              };
              dispatch(clear());
              dispatch(setAuth({ user }));
              _user
                .getIdToken()
                .then((res) => {
                  sessionStorage.setItem("jwt", res);
                  fire.auth().setPersistence(fire.auth.Auth.Persistence.SESSION);
                });
            }
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <div className="h-body bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className={"flex justify-center"}>
          <Logo />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {"Already got an account? "}
          <Link
            to="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstname"
                    name="firstname"
                    type="name"
                    autoComplete="firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastname"
                    name="lastname"
                    type="name"
                    autoComplete="lastname"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="appearance-none px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Repeat Password
              </label>
              <div className="mt-1">
                <input
                  id="password2"
                  name="passwor2"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordExtra(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
