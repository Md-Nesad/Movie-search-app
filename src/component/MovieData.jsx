import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

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
      <div className="md:pl-10 place-items-center md:place-items-start">
        <div className="text-[#77c6e8] py-5 space-y-5">
          <h1 className="text-3xl font-medium">Watch here your favorite</h1>
          <p className="md:text-lg md:w-[900px] w-[340px] leading-7">
            This is simple movie app using react js, react router dom, axios and
            OMDb Movie Api. <br /> This is front end project and I would like to
            show API integration, get data from API and using those data in UI.
          </p>
        </div>
        <div className="flex gap-1 mb-2">
          <input
            value={inputValue}
            onChange={handleInputValue}
            type="text"
            className="md:w-96 w-[220px] h-12 outline-none border-o rounded-md px-2 text-lg bg-[#77c6e8] text-white placeholder:text-gray-300"
            placeholder="search your movie here"
          />
          <Button
            onClick={handleSearch}
            className="bg-[#77c6e8] text-white hover:scale-105 transition"
          >
            Search
          </Button>
        </div>
      </div>
      {/* if data avalible */}
      {movieData ? (
        <>
          {loading && <Loading />}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 place-items-center">
            {movieData?.map((movie) => {
              return (
                <Card
                  key={movie.imdbID}
                  className="md:w-60 sm:w-48 my-10 bg-[#77c6e8]"
                >
                  <CardHeader floated={false} className="h-72">
                    <NavLink to={`/singleMovie/${movie?.imdbID}`}>
                      <img src={movie.Poster} alt={movie.Title} />
                    </NavLink>
                  </CardHeader>
                  <CardBody className="text-center">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {movie.Title.slice(0, 15)}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      {movie.Year}
                    </Typography>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* if data unavalible */}
          <h1 className="text-white text-center text-2xl my-32">
            Sorry! Movie not found..
          </h1>
        </>
      )}
    </>
  );
};

export default MovieData;
