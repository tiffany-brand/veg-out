import React from 'react';
import './DetailCard.css';

type Props = {
  heading?: string;
  paragraph?: string;
  listItem?: string;
}

const DetailCard: React.FC<Props> = ({
  heading,
  paragraph,
  listItem
}) => {

  return (
    <div className="detail-card" >
      <h4>{heading}</h4>
      <p>{paragraph}</p>
      <ul>
        <li>{listItem}</li>
      </ul>
    </div>
  );
}

export default DetailCard;
