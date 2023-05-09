import { useState } from "react";
import "./Trends.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
      resolve(data);
    });
  };

  const [data, setData] = useState(false);

  useEffect(() => {
    (async () => {
      const newData = await getData();
      setData(newData);
    })();
  }, []);

  return (
    <div className="trends">
      {(() => {
        if (!data) {
          return (
            <div className="loading">
              <img src="/assets/Rolling-1s-200px.gif" alt="" />
            </div>
          );
        } else {
          return data.results.map((movie, index) => {
            return (
              <div key={index} className="movie-card">
                <Link to={`/details/${encodeURI(movie.title)}`} state={{"movieData": movie}}>
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
                        return <span key={genreId}>{getGenreNameFromId(genreId)}</span>;
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
  );
};

export default Trends;
