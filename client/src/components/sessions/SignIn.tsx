import React, { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import fire from "../../fire";
import { selectAuth, setAuth, signOut } from "./AuthSlice";

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
        .then((res) => {
          if (res.user?.email) {
            dispatch(setAuth({ user: { email: res.user.email } }));
          }
        })
        .catch((error) => {
          console.error("Incorrect username or password");
        });
    }
  };
  return (
    <div className={` flex flex-row  justify-center items-center`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button type="submit">Sign in</button>
      </form>
      {auth.isAuth ? <div>AUTHORIZED</div> : <></>}
      {auth.isAuth ? (
        <button onClick={() => dispatch(signOut())}>sign out</button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default SignIn;
