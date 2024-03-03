import React from 'react';

interface CardProps {
  imageUrl: string;
  altText: string;
  cardText: string;
  onMinusClick: () => void;
  onPlusClick: () => void;
};

const Card: React.FC<CardProps> = ({ imageUrl, altText, cardText, onMinusClick, onPlusClick}) => {
  return (
    <div className="card w-48 flex-shrink-0">
  <img src={imageUrl} className="card-img-top" alt={altText}></img>
  <div className="card-body flex flex-row items-center justify-between">
    <p className="card-text">{cardText}</p>
    <div className="flex">
    <button onClick={onMinusClick} className="px-2.5 mx-2 rounded-full hover:bg-orange-300 border border-blue-500">
      -
    </button>
    <button onClick={onPlusClick} className="px-2 rounded-full hover:bg-orange-300 border border-blue-500">
      +
    </button>
    </div>
  </div>
</div>


  );
};

export default Card;
