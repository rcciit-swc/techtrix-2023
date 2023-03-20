import React from 'react'
import style from '@/styles/Event.module.css'
import Image from 'next/image'
// import img1 from '@/images/landingpage/Tetrix automata.svg'

const Events = () => {
    return (
        <div>
            <div className={style.wrapper}>
                <div className={`${style.box} ${style.a}`} >
                    <div id="a"><Image src="../images/landingpage/Techtrix robotics.svg" height={100} width={100} alt="" priority /></div>
                </div>
                <div className={`${style.box} ${style.b}`} >
                    <div id="b">B</div>
                </div>
                <div className={`${style.box} ${style.c}`} >
                    <div id="c">C</div>
                </div>
                <div className={`${style.box} ${style.d}`} >
                    <div id="d">D</div>
                </div>
                <div className={`${style.box} ${style.e}`}>
                    <div id="e">E</div>
                </div>
            </div>
        </div>
    )
}

export default Events
