import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SavedBooks from './pages/SavedBooks';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        >
        </Route>
        <Route
          path="/saved-books"
          element={<SavedBooks />}
        >
        </Route>
        <Route
          path="/about"
          element={<About />}
        >
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
