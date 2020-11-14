import React from 'react';
import './DetailCard.css';

type Props = {
  heading: string;
  paragraph: string;
}

const DetailCard: React.FC<Props> = ({
  heading,
  paragraph
}) => {

  return (
    <div className="detail-card" >
      <h4>{heading}</h4>
      <p>{paragraph}</p>
    </div>
  );
}

export default DetailCard;
