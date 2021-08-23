import { FormEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import fire from "../../fire";

const ForgotPassword = () => {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setRedirect(true);
      })
      .catch((err) => alert(err));
  };

  return redirect ? (
    <Redirect to={"/"} />
  ) : (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className={"mb-6"}>
            <h2 className={"text-3xl font-bold text-gray-900"}>
              Forgot your password?
            </h2>

            <p className={"mt-2 text-xs text-gray-500"}>
              Enter your email address to reset your password. You may need to
              check your spam folder.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
