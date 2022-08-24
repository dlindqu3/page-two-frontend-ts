import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SavedBooks from "./pages/SavedBooks";
import About from "./pages/About";

const App: React.FC = () => {

  const [displayModal, setDisplayModal] = useState(false); 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/saved-books"
            element={
              <>
                {/* pass displayModal as props to SavedBooks */}
                <SavedBooks showModal={displayModal} setShowModal={setDisplayModal}/>
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
