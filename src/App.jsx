import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Syncpage from ".//pages/sync"; 
import Asyncpage from "./pages/async";

function App() {
  return (
   <BrowserRouter>
  <div >
    <nav 
    >
      <Link
        to="/"
        
      >
        Sync Todo
      </Link>
      <Link
        to="/async"
        
      >
        Async Todo
      </Link>
    </nav>

    <main >
      <Routes>
        <Route path="/" element={<Syncpage />} />
        <Route path="/async" element={<Asyncpage />} />
      </Routes>
    </main>
  </div>
</BrowserRouter>

  );
}

export default App;
