import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import '../../styles/alert.css';

export const AlertMessage = ({show, handleClick, title, message, variant}) => {

  const [style, setStyle] = useState({
    color: '#0f5132',
    backgroundColor: '#d1e7dd',
    borderColor: '#badbcc'
  });

  useEffect(() => {
    if (variant === 'error') {
        setStyle({
          color: '#510f0f',
          backgroundColor: '#e7d1d1',
          borderColor: '#dbbaba'
        });
    }
  });

  return (
    <Alert show={show} className="alert" style={style}>
    <Alert.Heading>{title}</Alert.Heading>
    <div className="d-flex justify-content-end">
        <button className="alert-btn" onClick={handleClick}>
        {message}
        </button>
    </div>
    </Alert>
  );
}