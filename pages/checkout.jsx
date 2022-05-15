import Image from "next/image";
import React from "react";
import Link from "next/link";

const Checkout = () => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Image
          src="/images/under.svg"
          width={450}
          height={450}
          layout="fixed"
          alt="under"
        />
        <span className="text-2xl font-semibold text-indigo-700">
          Under construction
        </span>
        <div className="w-48">
          <Link href="/">
            <a className="btn-full text-white bg-green-600 hover:bg-green-700">
              Back to home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
