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
  const submitHandler = (data: LoginRequest) => {
    login(data);
  };

  return (
    <div className="w-full  h-auto">
      <div className="w-full py-4">
        <div className="flex flex-col items-center justify-between space-y-4">
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/connect/facebook`}>
            <a className="btn-full bg-indigo-700 text-white hover:bg-indigo-800 flex items-center space-x-2">
              <Image src="/images/fb.svg" alt={"fb"} width={32} height={32} />
              <span>{t("facebook")}</span>
            </a>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/connect/google`}>
            <a className="btn-full bg-white text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
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
      <div className="w-full border-b border-gray-200 my-8">
        <div className="bg-gray-200 relative">
          <div className="absolute -top-3 w-full text-center">
            <span className="bg-white p-2">{t("or")}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col items-center justify-between space-y-4 w-full">
          <div className="w-full">
            <label htmlFor="identifier">{t("email address")}</label>
            <input
              {...register("identifier", { required: true })}
              type="email"
              name="identifier"
              autoComplete={"Off"}
            />
          </div>
          <div className="w-full">
            <label htmlFor="password">{t("password")}</label>
            <input
              {...register("password", { required: true })}
              type="password"
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
              <label htmlFor="remember">{t("remember me")}</label>
            </div>
          </div>
          <div className="w-full py-4">
            <button
              type="submit"
              className="btn-full text-white bg-green-600 hover:bg-green-700"
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
