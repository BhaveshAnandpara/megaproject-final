import React from 'react'
import CollegeHeader from '../../components/CollegeHeader/CollegeHeader'
import PricingBody from '../../assets/Img/pricing-Body.png'
import '../InstituteDashboard/Pricing.css'

export default function Pricing() {
  
  return (
    <div className='PricingContainer'>
      <div>
        <CollegeHeader />
      </div>
      <div className="PricingBodyImg">
        <div>
        <img src={PricingBody} alt="My Image" />
        </div>
      </div>
    </div>
  )
}
