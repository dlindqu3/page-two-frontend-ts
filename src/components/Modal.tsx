import React from 'react'; 

const Modal: React.FC = ( ) =>{

  return (
    <div className='modalBg'>
      <div className='modalContainer'>
        <button>X</button>
        <div className='header'>Notes</div>
        <div className='body'>
          <br></br>
          <textarea id="newNotes" name="newNotes">Add new notes...</textarea>
        </div>
        <div className='footer'>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  )
}
export default Modal 