import React from 'react';
import './NewCard.css'

const NewCard = (props) => {
  const btnText = props.done ? 'Finished' : 'Next Question';
  return (
    <button className='nextCard' onClick={props.next} disabled={props.done} >
      {btnText}
    </button>
  )
}

export default NewCard;