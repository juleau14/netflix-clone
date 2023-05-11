import { useState } from "react";
import "./Trends.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import loading from './../../assets/loading.gif'
import waiter from "../../utils/waiter";


function getGenreNameFromId(id) {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  return genres[id] || null;
}

const Trends = () => {
  const getData = async () => {
    return new Promise(async (resolve, reject) => {
      const url =
        "https://api.themoviedb.org/3/trending/movie/day?api_key=4feb37d31bbaf5cf95e03f4fffe4c620";
      const options = {
        method: "GET",
        headers: {},
      };

      let data = null;

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        data = await JSON.parse(result);
      } catch (error) {
        console.error(error);
      }
      await waiter(1000);
      resolve(data.results);
    });
  };

  const [data, setData] = useState(false);

  useEffect(() => {
    (async () => {
      const newData = await getData();
      console.log("Je fetch de la bonne data");
      setData(newData);
    })();
  }, []);

  const SortSelector = () => {
    const handleChange = async () => {
      const selector = document.querySelector(".sort-selector");
      const value = selector.value;
      let newData;

      if (value === "1") {
        newData = [...data].sort((a, b) => a.vote_average - b.vote_average);
      } else if (value === "2") {
        newData = [...data].sort((a, b) => b.vote_average - a.vote_average);
      } else if (value === "0"){
        console.log("Hello world :)");
      }

      setData(newData);
    };

    return (
      <div className="sort-container">
        <span>Trier par :</span>
        <select name="sort" className="sort-selector" onChange={handleChange}>
          <option value="0">-------</option>
          <option value="1">Notes croissantes</option>
          <option value="2">Notes décroissantes</option>
        </select>
      </div>
    );
  };

  return (
    <>
      <SortSelector />
      <div className="trends">
        {(() => {
          if (!data) {
            return (
              <div className="loading">
                <img src={loading} alt="" />
              </div>
            );
          } else {
            return data.map((movie, index) => {
              return (
                <div key={movie.title} className="movie-card">
                  <Link
                    to={`/details/${encodeURI(movie.title)}`}
                    state={{ movieData: movie }}
                  >
                    <div
                      className="movie-image-container"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
                      }}
                    ></div>
                    <div className="movie-bottom">
                      <span className="movie-title">{movie.title}</span>
                      <div className="movie-genres">
                        {movie.genre_ids.map((genreId, index) => {
                          return (
                            <span key={genreId}>
                              {getGenreNameFromId(genreId)}
                            </span>
                          );
                        })}
                      </div>
                      <div className="movie-rate-year">
                        <span className="movie-rate">
                          {Math.round(movie.vote_average * 10) / 10}/10
                        </span>
                        <span className="movie-year">{movie.release_date}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            });
          }
        })()}
      </div>
    </>
  );
};

export default Trends;
