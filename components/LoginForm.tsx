import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
import { LoginRequest } from "../helpers/types";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { login, authReady } = useAuth();
  const { t } = useTranslation(["login"]);
  const { register, handleSubmit } = useForm<LoginRequest>();
  const submitHandler = async (data: LoginRequest) => {
    const res = await login(data);
    console.log(res);
  };

  return (
    <div className="w-full  h-auto">
      <div className="w-full py-4">
        <div className="flex flex-col items-center justify-between space-y-4">
          <Link href={`${process.env.API_URL}/connect/facebook`}>
            <a className="btn-full bg-indigo-700 text-white hover:bg-indigo-800  flex items-center space-x-2">
              <Image src="/images/fb.svg" alt={"fb"} width={32} height={32} />
              <span>{t("facebook")}</span>
            </a>
          </Link>
          <Link href={`${process.env.API_URL}/connect/google`}>
            <a className="btn-full bg-white  text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
              <Image
                src="/images/google.svg"
                alt={"fb"}
                width={26}
                height={26}
              />
              <span>{t("google")}</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="w-full border-b border-gray-200 border-opacity-30 my-8"></div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col items-center justify-between space-y-4 w-full">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="identifier">{t("email address")}</label>
            <input
              {...register("identifier", { required: true })}
              type="email"
              placeholder="Email address"
              name="identifier"
              autoComplete={"Off"}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="password">{t("password")}</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete={"Off"}
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
              <label htmlFor="remember" className="text-sm tracking-wide">
                {t("remember me")}
              </label>
            </div>
          </div>
          <div className="w-full py-4">
            <button
              type="submit"
              className="btn-full text-black font-semibold bg-yellow-400 hover:bg-yellow-500"
            >
              {t("login")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
