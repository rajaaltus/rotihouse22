import Image from "next/image";
import React from "react";

const ProductLoader = () => {
  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-2xl">
      <div className="flex flex-col justify-between h-full p-8">
        <Image
          src="/placeholder-img.jpeg"
          alt="image"
          width={800}
          height={600}
          className="object-contain rounded-lg"
        />
        <div className="flex flex-col space-y-2">
          <div className="w-full h-5 rounded-lg bg-gray-300"></div>
          <div className="w-full h-3 rounded-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;
