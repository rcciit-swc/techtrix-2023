import React from 'react'
import style from '@/styles/Event.module.css'

const Events = () => {
    return (
        <div>
            <div className={style.wrapper}>
                <div className={`${style.box} ${style.a}`} >
                    <div id="a">A</div>
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
