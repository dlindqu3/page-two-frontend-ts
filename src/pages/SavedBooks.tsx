import React, { useState, useEffect } from "react"; 
import axios from "axios";


const SavedBooks: React.FC = () => {

  interface bestsellerInt {
    _id: string;
    title: string;
    author: string;
    list: string;
  }

  const [bestsellerData, setBestsellerData] = useState<bestsellerInt[]>([]);

  // url for saved bestseller items in mongo db 
  const baseURL = 'http://page-two.herokuapp.com/api/'

  // useEffect -- typically runs on every page render 
    // useEffect, with an empty dependency array -- runs only on first page render 
  useEffect(() => {
    try{
      let url = baseURL + 'read-all'
      axios.get(url)
      .then(res => {
        console.log(res.data)
        setBestsellerData(res.data)
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
        })
    } catch (error){
      console.log('error: ', error)
    }
    }

  return (
    <div>
      <p>SavedBooks page here</p>
      <div>
      {bestsellerData[0] && bestsellerData.map((item) => {
        return <>
        <p key={item.title}> {item._id} {item.title} {item.author} {item.list}</p>
        <button onClick={() => {handleDeleteBook(item)} }>Delete</button>
        </>
      })}
      </div>
    </div>
  )
}

export default SavedBooks
