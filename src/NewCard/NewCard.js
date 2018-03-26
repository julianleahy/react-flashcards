import React from 'react';
import './NewCard.css'

const NewCard = (props) => {
  const btnText = props.done ? `Finished ${props.qNum} of ${props.nQues}` : `Question ${props.qNum} of ${props.nQues}`;
  return (
    <button className='nextCard' onClick={props.next} disabled={props.done} >
      {btnText}
    </button>
  )
}

export default NewCard;