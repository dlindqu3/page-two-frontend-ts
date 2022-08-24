import React, { useState } from 'react'; 
import axios from 'axios'; 

interface AppProps {
  showModal: boolean;
  setShowModal: Function; 
  updateId: string
}

const Modal: React.FC<AppProps> = props => {

  const [notes, setNotes] = useState('');

  let baseURL = "https://page-two.herokuapp.com/api";

  const handleUpdateBook = async (id: string, newNotes: string) => {
    try {
      let newObj = {
        notes: newNotes
      }
      let patchURL = baseURL + '/update/' + id
      axios.patch(patchURL, newObj)
        .then((response) => {
          console.log('axios patch call successful');
          console.log(response);
        })
    } catch (error){
      console.log('error: ', error)
    }

  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNotes(event.target.value);
    console.log('notes: ', notes); 
  }

  return (
    <div className='modalBg'>
      <div className='modalContainer'>
        <button onClick={() => {props.setShowModal(false)}}>X</button>
        <div className='header'>Notes</div>
        <div className='body'>
          <br></br>
          <textarea 
            onChange={handleTextChange}>{notes}</textarea>
        </div>
        <div className='footer'>
          <button onClick={() => {props.setShowModal(false)}}>Cancel</button>
          <button onClick={() => {handleUpdateBook( props.updateId, notes)}}>Save</button>
        </div>
      </div>
    </div>
  )
}
export default Modal 