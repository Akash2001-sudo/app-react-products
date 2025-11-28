import React, { useEffect, useState } from 'react';
import './FallingStars.css';

const FallingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const numStars = 50; 
      for (let i = 0; i < numStars; i++) {
        const size = Math.random() * 2 + 1;
        const style = {
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 8 + 5}s`,
          animationDelay: `${Math.random() * 10}s`,
        };
        newStars.push(<div key={i} className="star" style={style} />);
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return <>{stars}</>;
};

export default FallingStars;
