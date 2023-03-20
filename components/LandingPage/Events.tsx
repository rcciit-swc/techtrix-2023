import React from 'react'
import style from '@/styles/Event.module.css'
import Image from 'next/image'
import img1 from '@/images/landingpage/automata.svg'
import img2 from '@/images/landingpage/outofthebox.svg'
import img3 from '@/images/landingpage/gaming.svg'
import img5 from '@/images/landingpage/flagship.svg'
import img4 from '@/images/landingpage/robotics.svg'

const Events = () => {
    return (
        <div>
            <div className={style.wrapper}>
                <div className={`${style.box} ${style.a}`} >
                    <div className={style.element}><Image src={img1} height={437} width={440} alt="" priority /><h3>Automata</h3></div>
                </div>
                <div className={`${style.box} ${style.b}`} >
                    <div className={style.element}><Image src={img3} height={470} width={480} alt="" priority /><h3>Automata</h3></div>
                </div>
                <div className={`${style.box} ${style.c}`} >
                    <div className={style.element}><Image src={img2} height={437} width={440} alt="" priority /><h3>Automata</h3></div>
                </div>
                <div className={`${style.box} ${style.d}`} >
                    <div className={style.element}><Image src={img4} height={437} width={440} alt="" priority /><h3>Automata</h3></div>
                </div>
                <div className={`${style.box} ${style.e}`}>
                    <div className={style.element}><Image src={img5} height={437} width={440} alt="" priority /><h3>Automata</h3></div>
                </div>
            </div>
        </div>
    )
}

export default Events
