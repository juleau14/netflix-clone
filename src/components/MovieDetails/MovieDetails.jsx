import { useLocation } from "react-router-dom";
import "./MovieDetails.css";

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

const MovieDetails = () => {
  const location = useLocation();
  const movieData = location.state.movieData;

  return (
    <div className="movie-details">
      <div className="details-left">
        <div className="details-left-header">
          <h1 className="details-movie-title">{movieData.title}</h1>
          <div className="movie-genres">
            {movieData.genre_ids.map((genreId, index) => {
              return <span key={genreId}>{getGenreNameFromId(genreId)}</span>;
            })}
          </div>
          <h3 className="details-rate">
            {Math.round(movieData.vote_average * 10) / 10}/10
          </h3>
        </div>
        <p className="details-overview">{movieData.overview}</p>
      </div>
      <div className="details-right">
        <div
          className="details-image-container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MovieDetails;
