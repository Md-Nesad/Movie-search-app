import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";

const MovieData = () => {
  const [movieData, setMovieData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchval, setSearchVal] = useState("movie");
  const [loading, setLoading] = useState(true);

  const getMovieData = async () => {
    setLoading(true);
    const data = await axios.get(
      `https://www.omdbapi.com/?apikey=29c8ed77&s=${searchval}`
    );
    setMovieData(data?.data?.Search);
    setLoading(false);
  };

  useEffect(() => {
    getMovieData();
  }, [searchval]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue === "") {
      return alert("Write a movie name first!");
    }
    setSearchVal(inputValue);
    setInputValue("");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row px-4">
          <div className="col-6">
            <div className="colors">
              <h1>Watch here your favorite</h1>
              <p>
                This is simple movie app using react js, react router dom, axios
                and OMDb Movie Api. This is front end project and I would like
                to show API integration, get data from API and using those data
                in UI.
              </p>
            </div>
            <div className="d-flex gap-2">
              <input
                value={inputValue}
                onChange={handleInputValue}
                type="text"
                className="input-field w-75 outline-none border-o rounded px-2"
                placeholder="search your movie here"
              />
              <button
                onClick={handleSearch}
                className="search-button w-25 border-0 rounded"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* if data avalible */}
      {movieData ? (
        <>
          {loading && <Loading />}
          <div className="row px-4 m-5 gap-5">
            {movieData?.map((movie) => {
              return (
                <div className="col-2 card py-3 my" key={movie.imdbID}>
                  <NavLink
                    className={"text-decoration-none"}
                    to={`/singleMovie/${movie?.imdbID}`}
                  >
                    <div>
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="movie-cart"
                      />
                      <div className="py-2">
                        <p className="colors fs-5 text-center m-0 title-text">
                          {movie.Title}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* if data unavalible */}
          <h1 className="text-white text-center error-message">
            Sorry! No movie found..
          </h1>
        </>
      )}
    </>
  );
};

export default MovieData;
