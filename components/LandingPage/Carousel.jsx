import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import Techtrix1 from "@/public/images/Techtrix.svg";
import Techtrix2 from "@/public/images/Techtrix (1).svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    centerPadding: "15px",
    cssEase: "linear",
    prevArrow: null,
    nextArrow: null,

    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slick bg-black flex items-center h-16">
      <Slider {...settings}>
        <div className=" flex items-center">
          <img src="/images/Techtrix (1).svg" alt="Techtrix" className=" w-[50%]" />
        </div>
        <div>
          <img src="/images/Techtrix.svg" alt="Techtrix" className="w-[50%]" />
        </div>
        <div className=" flex items-center">
          <img src="/images/Techtrix (1).svg" alt="Techtrix" className=" w-[50%]" />
        </div>
        <div>
          <img src="/images/Techtrix.svg" alt="Techtrix" className="w-[50%]" />
        </div>
        <div className=" flex items-center">
          <img src="/images/Techtrix (1).svg" alt="Techtrix" className=" w-[50%]" />
        </div>
        <div>
          <img src="/images/Techtrix.svg" alt="Techtrix" className="w-[50%]" />
        </div>
        <div className=" flex items-center">
          <img src="/images/Techtrix (1).svg" alt="Techtrix" className=" w-[50%]" />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
