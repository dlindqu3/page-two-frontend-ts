import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SavedBooks from "./pages/SavedBooks";
import About from "./pages/About";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import "./index.css";


const App: React.FC = () => {

  const [displayModal, setDisplayModal] = useState(false); 
  const [updateId, setUpdateId] = useState(''); 
   
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/saved-books"
            element={
              <>
                <SavedBooks showModal={displayModal} setShowModal={setDisplayModal} setUpdateId={setUpdateId}/>

                {displayModal && <Modal showModal={displayModal} setShowModal={setDisplayModal} updateId={updateId}/>}
              </> 
            }
          ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
