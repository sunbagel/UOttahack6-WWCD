import React from 'react';

interface CardProps {
    imageUrl: string;
    altText: string;
    cardText: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, altText, cardText }) => {
  return (
    <div className="card w-48 flex-shrink-0">
      <img src={imageUrl} className="card-img-top" alt={altText}></img>
      <div className="card-body">
        <p className="card-text">{cardText}</p>
      </div>
    </div>
  );
};

export default Card;
