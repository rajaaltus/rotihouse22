import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation } from "swiper";
const sliderImages = [
  {
    id: 1,
    url: "/images/hero/banner-1.jpg",
    mobileUrl: "images/hero/banner-mobile-1.jpg",
  },
  {
    id: 2,
    url: "/images/hero/banner-2.jpg",
    mobileUrl: "images/hero/banner-mobile-2.jpg",
  },
  {
    id: 3,
    url: "/images/hero/banner-3.jpg",
    mobileUrl: "images/hero/banner-mobile-3.jpg",
  },
];
const HeroSlider = () => {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      className="mySwiper mt-16 shadow-xl"
      modules={[Navigation]}
    >
      {sliderImages.map((slider) => (
        <SwiperSlide key={slider.id}>
          <div className="w-full h-full">
            <img
              className="lg:hidden block w-full h-full object-cover object-center"
              src={slider.mobileUrl}
              alt="banner1"
            />
            <img
              className="hidden lg:block w-full h-full object-cover object-top"
              src={slider.url}
              alt="banner1"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
