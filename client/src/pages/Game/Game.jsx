import React from 'react'
import Intro from './Intro'
import { useNavigate } from 'react-router-dom'

export default function Game() {

  const navigate = useNavigate()

  let auth = JSON.parse(localStorage.getItem("auth"))

  if( auth === null ) window.location.replace('/login')

  return (
    <section style={{ border : '1px solid black' , width : '26vw' , height : '98vh' , position : 'absolute' , left : '50%' , translate : '-50% 0%' }} >


      <Intro/>


    </section>
  )
}
