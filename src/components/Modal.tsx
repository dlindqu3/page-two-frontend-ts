import React, { useState } from 'react'; 
import axios from 'axios'; 

interface AppProps {
  showModal: boolean;
  setShowModal: Function; 
  updateId: string
}

const Modal: React.FC<AppProps> = props => {

  const [notes, setNotes] = useState('');

  // let baseURL = "https://page-two.herokuapp.com/api";
  let baseURL = "https://page-two-server.onrender.com/api"

  const handleUpdateBook = async (id: string, newNotes: string) => { 
    try {
      let newObj = {
        notes: newNotes
      }
      let patchURL = baseURL + '/update/' + id
      axios.patch(patchURL, newObj)
        .then((response) => {
          props.setShowModal (false); 
          window.location.reload();
        })
    } catch (error){
      console.log('error: ', error)
    }

  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNotes(event.target.value);
  }

  return (
    <div className='bg-slate-300 opacity-95 fixed inset-0 z-50'>
      <div className='flex h-screen justify-center items-center'>
      <div className='modalContainer bg-slate-600 rounded-md'>
        <div className='m-2'>
        <div className='header my-2 text-white'>Enter notes here:</div>
        <div className='body'>
          <textarea 
            onChange={handleTextChange}>{notes}</textarea>
        </div>
        <div className='footer'>
          <button onClick={() => {props.setShowModal(false)}}  className="bg-red-400 hover:bg-red-500 text-white px-2 rounded cursor-pointer ">Cancel</button>
          <button onClick={() => {handleUpdateBook( props.updateId, notes)}} className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded cursor-pointer">Save</button>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Modal 