import React from 'react';
import './NewCard.css'

const NewCard = (props) => (
    <button className='nextCard' onClick={props.next} disabled={props.done} >
      Next Question
    </button>
)

export default NewCard;