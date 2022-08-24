import React, { useState, useEffect } from "react"; 
import Modal from "../components/Modal";
import axios from "axios";


interface AppProps {
  showModal: boolean;
  setShowModal: Function; 
  setUpdateId: Function
}

const SavedBooks: React.FC<AppProps> = props => {

  interface bestsellerInt {
    _id: string;
    title: string;
    author: string;
    list: string;
    notes?: string
  }

  const [bestsellerData, setBestsellerData] = useState<bestsellerInt[]>([]);
  const [notes, setNotes] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState(true);


  // url for saved bestseller items in mongo db 
  const baseURL = 'http://page-two.herokuapp.com/api/'

  // useEffect -- typically runs on every page render 
    // useEffect, with an empty dependency array -- runs only on first page render 
  useEffect(() => {
    try{
      let url = baseURL + 'read-all'
      axios.get(url)
      .then(res => {
        console.log(res.data);
        setBestsellerData(res.data); 
        setIsLoading(false); 
      })
    } catch(error){
      console.log(error)
    }
  }, []);

  const handleDeleteBook = async (book: bestsellerInt) => {
    try { 
      let deleteURL = baseURL + 'delete/' + book._id
      console.log('deleteURL: ', deleteURL)
      axios.delete(deleteURL) 
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
    } catch (error){
      console.log('error: ', error)
    }
    }

    const handleShowModal = (item: bestsellerInt) => {
      props.setUpdateId(item._id); 
      props.setShowModal(true);
      console.log('current item id at update: ', item._id); 
    }

  return (
    <>
    <div>
      <p>SavedBooks page here</p>
      {isLoading && <p>Loading...</p>}
      <div>
      {bestsellerData[0] && bestsellerData.map((item) => {
        return <>
        <p key={item.title}> {item._id} {item.title} {item.author} {item.list}</p> 
        <br></br>
        {item.notes && <p key={item.title}>Notes: {item.notes}</p>}
        <button onClick={() => {handleDeleteBook(item)} }>Delete</button>
        <button onClick={() => { handleShowModal(item)}}>Update notes</button>
        </>
      })}
      </div>
    </div>
    </>
  )
}

export default SavedBooks
