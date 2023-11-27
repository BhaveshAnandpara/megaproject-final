import React from 'react'
import '../PodcastCard/PodcastCard.css'
import PodGroup from '../PodcastCard/PodGroup.png'
const cardData = [
    { title: 'Card 1', description: 'Beyond the Obsession: Unraveling the Truth About OCD' },
    { title: 'Card 2', description: 'Unmasking the Battle Within: A Candid Discussion on PTSD' },
    { title: 'Card 3', description: 'Breaking Free: Navigating Lifes Storms – A Conversation About Anxiety' },
    
 // Add more card data as needed
  ];
  const backgroundColors = ["#DCC8DB", "#C8D0DC", "#C8DCC9"];

export default function PodcastCard() {
  return (
    <div className="horizontal-card-scroll">
      {cardData.map((card, index) => (
        <div
        key={index}
        className="card"
        style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
      >
          {/* <h2>{card.title}</h2> */}
          <p>{card.description}</p>
          <div className="PodImg">
          <img src={PodGroup} alt="My Image" />
          </div>
        </div>
      ))}
    </div>
  )
}
