import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/AuthContext";
import Link from "next/link";

const LoginForm = () => {
  const { login, authReady } = useAuth();
  const { register, handleSubmit } = useForm();
  const submitHandler = (data) => {
    login(data);
  };

  return (
    <div className="w-full  h-auto">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col items-center justify-between space-y-4 w-full">
          <div className="w-full">
            <label htmlFor="identifier">Email address</label>
            <input
              {...register("identifier", { required: true })}
              type="email"
              name="identifier"
              autoComplete={"Off"}
              value="raja@gmail.com"
            />
          </div>
          <div className="w-full">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              autoComplete={"Off"}
              value="raja98424"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex  w-1/2 items-center justify-start">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="w-8"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className="">
              <p>Forgot your password?</p>
            </div>
          </div>
          <div className="w-full py-4">
            <button
              type="submit"
              className="btn-full text-white bg-green-600 hover:bg-green-700"
            >
              Sign in
            </button>
          </div>
          <div className="w-full border-b border-gray-200">
            <div className="bg-gray-200 relative">
              <div className="absolute -top-3 w-full text-center">
                <span className="bg-white p-2">OR</span>
              </div>
            </div>
          </div>
          <div className="w-full py-4">
            <div className="flex items-center justify-between space-x-4">
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/connect/facebook`}
              >
                <a className="btn-full bg-indigo-700 text-white hover:bg-indigo-800">
                  Facebook
                </a>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}>
                <a className="btn-full bg-white text-gray-700 hover:bg-gray-100">
                  Google
                </a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
