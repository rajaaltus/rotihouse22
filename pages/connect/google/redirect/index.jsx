import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Logo from "../../../../components/Logo";
import { useAuth } from "../../../../hooks/useAuth";

const Facebook = () => {
  const router = useRouter();
  const { authorize, authReady } = useAuth();

  useEffect(() => {
    if (router.query.access_token) {
      authorize(router.query.access_token, "google");
    }
  }, [router]);

  useEffect(() => {
    router.push("/checkout");
  }, [authReady]);
  return (
    <div className="w-full h-screen bg-red-700 text-emerald-200 p-8 ">
      <div className=" h-full w-full flex items-center justify-center ">
        <div className="w-xl text-center">
          <div className="w-64 mx-auto pb-8">
            <Logo />
          </div>
          <span className="text-2xl font-bold tracking-wide animate-pulse">
            Authenticating... Please Wait...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Facebook;
