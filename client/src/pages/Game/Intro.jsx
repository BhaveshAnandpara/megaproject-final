import React, { useState } from 'react'
import Start1 from '../../assets/Game/Start1.png'
import instrcution from '../../assets/Game/instructions.png'
import '../../App.css'
import { useNavigate } from 'react-router-dom'

export default function Intro() {

    const [start, setstart] = useState(false)
    const navigate = useNavigate()


    return (
        <>

            <div className='game-container' >

                {

                    !start &&
                    <>
                        <img src={Start1} alt="img" style={{ marginBottom: '80px', transform: 'scale(0.8)' }} />

                        <button className='game-btn' onClick={() => setstart(true)} > Start Game </button>
                    </>
                }

                {

                    start &&
                    <>
                        <img src={instrcution} alt="img" style={{ transform: 'scale(0.8)' }} />

                        <button className='game-btn' onClick={() =>  navigate('/student/game/profile') } > Let's Go </button>
                    </>
                }



            </div>

        </>
    )
}
