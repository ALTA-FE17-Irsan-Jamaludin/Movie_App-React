import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: any;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genres: any;
  popularity: number;
  production_companies: any;
}

function Detail() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f150276c4e0b2101017c933bd6f025ce`);
        setMovie(response.data);
      } catch (error) {
        setMovie(null);
      }
    };

    fetchData();
  }, [id]);

  const homeButton = (): void => {
    navigate("/");
  };

  const favoriteButton = (): void => {
    navigate("/favorite");
  };

  const poster = `https://image.tmdb.org/t/p/w500/`;

  return (
    <>
      <section>
        <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
          <div className="left bg-teal-600 h-1/3 sm:h-full flex flex-col justify-center items-center border-r-2 border-slate-400  sm:w-[50%] lg:w-[35%] w-screen shadow-md">
            <span className=" font-bold text-3xl drop-shadow-md">Movies App</span>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 w-11/12 my-5 px-3">
              <button className=" shadow-md  px-4 py-3 lg:py-8 bg-slate-200 flex justify-center items-center opacity-95" onClick={homeButton}>
                <img className="h-8 lg:h-10" src="https://img.icons8.com/3d-fluency/94/film-reel.png" alt="film-reel" />
                <span className="ml-2 text-2xl font-bold text-white drop-shadow-md "> Home</span>
              </button>
              <button className="shadow-md  px-4 py-3 lg:py-8 bg-slate-200 flex justify-center items-center opacity-95" onClick={favoriteButton}>
                <img className="h-8 lg:h-10" src="https://img.icons8.com/3d-fluency/94/love-circled.png" alt="love-circled" />
                <span className="ml-2 text-2xl font-bold text-white drop-shadow-md"> Favorite</span>
              </button>
            </div>
            <hr />
          </div>

          <div className="right sm:ml-2 w-screen  overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2  ">
            <div className=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 items-center justify-center gap-3 lg:px-5 px-0">
              {movie === null ? (
                <div>Data Not Found</div>
              ) : (
                <div className="flex flex-col lg:flex-row justify-center lg:w-auto items-center gap-5 w-screen rounded-md overflow-hidden lg:pb-0 pb-8 lg:pt-0 pt-[19rem] bg-teal-700">
                  <div className="lg:w-2/5 w-[95%] lg:relative lg:h-full">
                    <img src={poster + movie.poster_path} height={50} className="lg:rounded-none rounded-md" />
                  </div>
                  <div className="h-full w-screen flex flex-col lg:w-3/5 gap-3 px-5 ">
                    <span className="text-xl font-bold">{movie.title}</span>
                    <span className="text-sm mb-5 lg:w-auto md:pr-96 lg:pr-0">{movie.overview}</span>
                    <div className="flex gap-2 h-8 w-11/12 items-center">
                      <span className="px-5 py-2 bg-green-400 font-bold">{movie.vote_average}</span>
                      <span className="px-5 py-2 bg-black">{movie.release_date}</span>
                    </div>
                    <span>
                      {" "}
                      <span className="font-semibold">Genre :</span> {movie.genres[0].name}
                    </span>
                    <span>
                      {" "}
                      <span className="font-semibold">Popularity :</span> {movie.popularity}
                    </span>
                    <span>
                      {" "}
                      <span className="font-semibold">Production :</span> {movie.production_companies[0].name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;
