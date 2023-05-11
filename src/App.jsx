import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Trends from "./components/Trends/Trends";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="trends" element={<Trends />} />
          <Route path="/details/:movieName" element={<MovieDetails />} />
          <Route path="/" element={<Navigate to={"/trends"} replace />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
