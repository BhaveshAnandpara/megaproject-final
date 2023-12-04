import React from 'react'
import CollegeHeader from '../../components/CollegeHeader/CollegeHeader'
import AnalyticsBody from '../../assets/Img/Institute-Body.png'
import '../InstituteDashboard/Analytics.css'


export default function Analytics() {
  return (
    <div>
      <CollegeHeader />
      <div className="AnalyticsHeroSection">
 
        <img src={ AnalyticsBody } />

      </div>
    </div>
  )
}
