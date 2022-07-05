import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation } from "swiper";

const sliderImages = [
  {
    id: 1,
    url: "/images/hero/banner1.jpg",
    mobileUrl: "/images/hero/mobile-banner1.png",
    text: "/images/hero/banner_text_authentic.png",
  },
  {
    id: 2,
    url: "/images/hero/banner2.jpg",
    mobileUrl: "/images/hero/mobile-banner2.png",
    text: "/images/hero/banner_text_south.png",
  },
  {
    id: 3,
    url: "/images/hero/banner3.jpg",
    mobileUrl: "/images/hero/mobile-banner3.png",
    text: "/images/hero/banner_text_never.png",
  },
];
const HeroSlider = () => {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      className="mySwiper   h-auto"
      modules={[Navigation]}
    >
      {sliderImages.map((slider) => (
        <SwiperSlide key={slider.id}>
          <div className="relative w-full h-96 lg:hidden block">
            <div className="w-48 h-20 absolute top-8 left-4 z-10">
              <Image
                src={slider.text}
                alt="banner-text"
                layout="fill"
                className="object-contain"
              />
            </div>
            <Image
              priority
              className="object-cover object-center"
              src={slider.mobileUrl}
              alt="banner1"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="relative w-full h-half-screen lg:block hidden">
            <div className="w-1/2 h-40 absolute top-8 left-0  z-10">
              <Image
                src={slider.text}
                alt="banner-text"
                layout="fill"
                className="object-contain "
              />
            </div>
            <Image
              priority
              className="w-full h-full object-cover object-top"
              src={slider.url}
              alt="banner1"
              layout="fill"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
