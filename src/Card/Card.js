import React from 'react';
import './Card.css'

const Card = (props) => (
    <div>{props.question}{props.answer}</div>
)

export default Card;