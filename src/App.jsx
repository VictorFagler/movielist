import { useState } from "react";

import "./App.css";
import MovieList from "./components/MovieList";

function App() {
  return (
    <>
      <div className="bg-gray-100">
        <MovieList />
      </div>
    </>
  );
}

export default App;
