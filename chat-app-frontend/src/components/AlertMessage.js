import React from 'react'
import { Alert } from 'react-bootstrap';

export const AlertMessage = ({show, handleClick, title, message, style: variant}) => {
  return (
    <Alert show={show} variant={variant} className="auth-alert">
    <Alert.Heading>{title}</Alert.Heading>
    <div className="d-flex justify-content-end">
        <button className="auth-alert-btn" onClick={handleClick}>
        {message}
        </button>
    </div>
    </Alert>
  );
}
