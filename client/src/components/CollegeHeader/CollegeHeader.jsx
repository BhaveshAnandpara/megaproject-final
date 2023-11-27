import React from 'react'
// import {Link, useNavigate} from 'react-router-dom'
import '../Header/Header.css'
import { Link } from 'react-router-dom'
import UmeedLogo from '../Header/UmeedLogo.png'
import ClgHeader from '../CollegeHeader/ClgHeader.png'

import { useNavigate } from 'react-router-dom'

export default function Header() {

    const navigate = useNavigate()

    return (
        <div className='NavContainer'>
            <div className="UmeedName">
                <img src={UmeedLogo} alt="My Image" />
            </div>
            <div className="NavElements">
                
                    <a className='NavHome Home' href='' onClick={() => navigate('/institute/Pricing')} ><p>Pricing</p></a>
             
                
                    <a className='NavConnect Connect' href='' onClick={() => navigate('/institute/analytics')} ><p>Analytics</p></a>
               
                
                    
                
                
                    <a className='NavLogout Logout' href='' onClick={() => navigate('/student/Logout')} ><p>Logout</p></a>
               
            </div>
            <div className="ProfileImg">
                <img src={ClgHeader} alt="My Image" />
            </div>
        </div>
    )
}
