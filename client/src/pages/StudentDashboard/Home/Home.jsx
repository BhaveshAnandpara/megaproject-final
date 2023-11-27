import React from 'react'
// import '../StudentDashboard/StudentDashboard.css'
import '../Home/Home.css'
import HomePicOne from '../../../assets/Img/HomePicOne.png'
import HomePagePicTwo from '../../../assets/Img/HomePagePicTwo.png'
import HomePgeBlogThree from '../../../assets/Img/HomePgeBlogThree.png'
import CheckoutourPodcast from '../../../assets/Img/CheckoutourPodcast.png'
import Podcats from '../../../assets/Img/podcats.png'
import PodcastCard from './PodcastCard/PodcastCard'

import Header from '../../../components/Header/Header'

export default function Home() {
  return (
    
    <>
    
    <Header/>   

    <div className="MainHomeContainer">
      <div className="HomeOneImg">
      <img src={HomePicOne} alt="My Image" />
      </div>
      <div className="HomeTwoImg">
      <img src={HomePagePicTwo} alt="My Image" />

      </div>
      <div className="HomeThreeImg">
      <img src={HomePgeBlogThree} alt="My Image" />
      </div>
      <div className="HomeThreeImg">
      <img  className='CheckoutourPodcastImg' src={CheckoutourPodcast} alt="My Image" />
     
      <PodcastCard/>
      </div>
      <div className="HomeThreeImg">
      <img src={Podcats} alt="My Image" />
      
      </div>
    </div>

    </>
  )
}
