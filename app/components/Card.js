// Card.js
import React from 'react';
import useRadialBackground from '../hooks/useRadialBackground';

export const Card = ({ title, description }) => {
  const radialStyle = useRadialBackground();

  const cardStyle = {
    radialStyle,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#333', // Color de texto
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <div style={cardStyle}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button type="button">Learn More</button>
    </div>
  );
};

