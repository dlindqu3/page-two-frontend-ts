import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";

interface AppProps {
  showModal: boolean;
  setShowModal: Function;
  setUpdateId: Function;
}

const SavedBooks: React.FC<AppProps> = (props) => {
  interface bestsellerInt {
    _id: string;
    title: string;
    author: string;
    list: string;
    notes?: string;
  }

  const [bestsellerData, setBestsellerData] = useState<bestsellerInt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // url for saved bestseller items in mongo db
  const baseURL = "http://page-two.herokuapp.com/api/";

  // useEffect -- typically runs on every page render
  // useEffect, with an empty dependency array -- runs only on first page render
  useEffect(() => {
    try {
      let url = baseURL + "read-all";
      axios.get(url).then((res) => {
        console.log(res.data);
        setBestsellerData(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteBook = async (book: bestsellerInt) => {
    try {
      let deleteURL = baseURL + "delete/" + book._id;
      console.log("deleteURL: ", deleteURL);
      axios.delete(deleteURL).then((response) => {
        console.log(response);
        window.location.reload();
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleShowModal = (item: bestsellerInt) => {
    props.setUpdateId(item._id);
    props.setShowModal(true);
    console.log('props.showModal: ', props.showModal)
    console.log("current item id at update: ", item._id);
  };

  return (
    <>
      <div className="h-full min-h-screen bg-amber-100 rounded-sm">
        {isLoading && <p>Loading...</p>}
        <div className="bg-slate-200 rounded-md mx-2 flex flex-wrap">
          {bestsellerData[0] &&
            bestsellerData.map((item) => {
              return (
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 m-3">
                  <div className="px-6 py-4">
                  <p
                    key={item.title}
                    className="text-gray-700 text-base content-center"
                  >
                    <div className="font-bold mb-2 content-center">
                      {item.title}
                    </div>
                    <div className="text-gray-700 text-base content-center">Author: {item.author}</div>
                    <div className="text-gray-700 text-base content-center">List: {item.list}</div>

                    {item.notes && <p key={item.title} className="text-gray-700 text-base content-center">Notes: {item.notes}</p>}
                  </p>
                  <br />
                  <button
                    onClick={() => {
                      handleDeleteBook(item);
                    }}
                    className="bg-red-400 hover:bg-red-500 text-white px-2 rounded cursor-pointer "

                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded cursor-pointer "

                  >
                    Update Notes
                  </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SavedBooks;
