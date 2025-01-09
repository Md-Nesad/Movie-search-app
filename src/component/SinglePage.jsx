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
        Year : <span className="title">{singelData.Year}</span>
      </h4>{" "}
      <hr className="text-white" />
      {loading && <Loading />}
      {/* movie details */}
      <div className="container">
        <div className="row gap-5 ">
          <div className="col-4 images">
            <img
              className="singleImage"
              src={singelData.Poster}
              alt={singelData.Title}
            />
          </div>

          <div className="col-7 gap-5 text-white mt-5 py-5">
            <h3>{singelData.Title}</h3>
            <p>{singelData.Plot}</p>
            <h4>Released : {singelData.Released}</h4>
            <h5>Actors : {singelData.Actors}</h5>
            <h4>Awards : {singelData.Awards}</h4>
            <h4>Ratings : {singelData.imdbRating} ***</h4>
            <h4>Writer : {singelData.Writer}</h4>
            <h4>Director : {singelData.Director}</h4>
          </div>
          <button className="back-Button" onClick={() => navigate("/")}>
            Back to home
          </button>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
