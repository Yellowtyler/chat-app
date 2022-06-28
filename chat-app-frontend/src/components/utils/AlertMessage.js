import React from 'react'
import { Alert } from 'react-bootstrap';
import '../../styles/alert.css';

export const AlertMessage = ({show, handleClick, title, message, style: variant}) => {
  return (
    <Alert show={show} variant={variant} className="alert">
    <Alert.Heading>{title}</Alert.Heading>
    <div className="d-flex justify-content-end">
        <button className="alert-btn" onClick={handleClick}>
        {message}
        </button>
    </div>
    </Alert>
  );
}
