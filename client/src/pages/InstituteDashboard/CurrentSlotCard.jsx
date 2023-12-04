import React from 'react'
import '../InstituteDashboard/CurrentSlotCard.css'


const SlotCardData = [
    { title: '1000' },
    { title: '5000' },
    { title: '2450' },
    { title: '2550' },
];

export default function CurrentSlotCard() {
    
  return (
    <div className="SlotCard">
      {SlotCardData.map((card, index) => (
        <div
          key={index}
          className={`cards card${index + 1}`} // Use class names based on the index
        >
          <div className="cardNos">{card.title}</div>
        </div>
      ))}
    </div>
  );
}