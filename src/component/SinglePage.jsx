import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const SinglePage = () => {
  const [singelData, setSingleData] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  //fetch single movie data
  const getSingleData = async () => {
    setLoading(true);
    const data = await axios.get(
      `https://www.omdbapi.com/?apikey=29c8ed77&i=${id}`
    );
    setSingleData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getSingleData();
  }, []);
  return (
    <>
      <h4 className="text-white text-center my-3">
        Year :{" "}
        <span className="bg-[#77c6e8] px-4 py-2 rounded-sm">
          {singelData.Year}
        </span>
      </h4>{" "}
      <hr className="text-white" />
      <button
        className="text-[#77c6e8] underline ml-5 hover:text-white transition-colors"
        onClick={() => navigate("/")}
      >
        Back to home
      </button>
      {loading && <Loading />}
      {/* movie details */}
      <div className=" md:flex md:justify-around md:items-center">
        <div>
          <img
            className="singleImage drop-shadow-md px-3"
            src={singelData.Poster}
            alt={singelData.Title}
          />
        </div>

        <div className="text-white space-y-5 mt-10 px-3">
          <h3 className="text-2xl">{singelData.Title}</h3>
          <p className="w-[345px]">{singelData.Plot}</p>
          <h4>
            <span className=" underline">Released </span>: {singelData.Released}
          </h4>
          <h5>
            <span className=" underline">Actors </span> : {singelData.Actors}
          </h5>
          <h4>
            <span className=" underline">Awards </span> : {singelData.Awards}
          </h4>
          <h4>
            <span className=" underline">Ratings </span> :{" "}
            {singelData.imdbRating} ***
          </h4>
          <h4>
            <span className=" underline">Writer </span> : {singelData.Writer}
          </h4>
          <h4>
            <span className=" underline">Director </span> :{" "}
            {singelData.Director}
          </h4>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
