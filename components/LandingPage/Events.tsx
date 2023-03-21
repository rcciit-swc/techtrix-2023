import React from "react";
import style from "@/styles/Event.module.css";
import Image from "next/image";
import img1 from "@/images/landingpage/automata.png";
import img2 from "@/images/landingpage/outofthebox.png";
import img3 from "@/images/landingpage/gaming.png";
import img5 from "@/images/landingpage/flagship.png";
import img4 from "@/images/landingpage/robotics.png";

const Events = () => {
  return (
    
      <div className={style.wrapper}>
        <div className={`${style.box} ${style.a}`}>
          <div className={style.element}>
            <Image src={img1} height={200} width={205} alt="" priority />
            <h2>Automata</h2>
            <button className={style.register}>REGISTER NOW</button>
          </div>
        </div>
        <div className={`${style.box} ${style.b}`}>
          <div className={style.element}>
            <Image src={img3} height={200} width={205} alt="" priority />
            <h2>Automata</h2>
            <button className={style.register}>REGISTER NOW</button>
          </div>
        </div>
        <div className={`${style.box} ${style.c}`}>
          <div className={style.element}>
            <Image src={img2} height={200} width={205} alt="" priority />
            <h2>Automata</h2>
            <button className={style.register}>REGISTER NOW</button>
          </div>
        </div>
        <div className={`${style.box} ${style.d}`}>
          <div className={style.element}>
            <Image src={img4} height={200} width={205} alt="" priority />
            <h2>Automata</h2>
            <button className={style.register}>REGISTER NOW</button>
          </div>
        </div>
        <div className={`${style.box} ${style.e}`}>
          <div className={style.element}>
            <Image src={img5} height={200} width={205} alt="" priority />
            <h2>Automata</h2>
            <button className={style.register}>REGISTER NOW</button>
          </div>
        </div>
      </div>

  );
};

export default Events;
