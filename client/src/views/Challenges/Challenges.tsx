import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard'
import './Challenges.css'

export default function Challenges() {

  const heading = "This is the heading";
  const paragraph = "And the paragraph";


  return (
    <div className="challenges-container">
      <DetailCard heading={heading} paragraph={paragraph} />
      <DetailCard heading={heading} paragraph={paragraph} />
    </div>
  )

};