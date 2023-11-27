import React from 'react'
import Header from '../../../components/Header/Header'
import Book_SLot from '../../../assets/Img/Book_SLot.png'
import '../BookSlot/BookSlot.css'
import { useNavigate } from 'react-router-dom';

export default function BookSlot() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
      <Header/>
      </div>
      <div className="BookSlotContainer">
        <div className="BookSlotImg">
      <img  onClick={() => navigate('/student/Connect')}  src={Book_SLot} alt="My Image" />
        </div>
      </div>
    </div>
  )
}
