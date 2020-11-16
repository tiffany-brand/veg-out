import React from 'react';
import './DetailCard.css';

export default function DetailCard(props: any) {

  return (
    <div className="detail-card" >
      {props.children}
    </div>
  );
}

