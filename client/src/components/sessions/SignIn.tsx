import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import fire from "../../fire";
import { selectAuth, setAuth, User } from "./AuthSlice";

const SignIn = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          if (userCredential.user) {
            const user: User = {
              id: userCredential.user.uid,
              email: userCredential.user.email,
            };
            dispatch(setAuth({ user: user }));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className={"flex flex-row justify-center mt-10"}>
      <div
        className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col`}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="hover:bg-blue-400 bg-blue-500 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
              href="#"
            >
              Forgot Password?
            </a>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
