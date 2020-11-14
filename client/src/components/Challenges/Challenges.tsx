import React from 'react';
import DetailCard from '../DetailCard/DetailCard'

export default function Challenges() {

  const heading = "This is the heading";
  const paragraph = "And the paragraph";

  return (
    <div>
      <DetailCard heading={heading} paragraph={paragraph} />
    </div>
  )

};