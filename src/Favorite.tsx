import { useState, useEffect } from "react";
import CardFavorite from "./Components/CardFavorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  rating: number;
  title: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
}

interface OutputData {
  home: boolean;
  showModal: boolean;
  apiDataPlaying: [];
  apiDataFavorite: [];
  selectedMovie: Movie | null;
}

function Favorite() {
  const navigate = useNavigate();
  const poster = `https://image.tmdb.org/t/p/w500/`;

  const [nilaiOutput, setNilaiOutput] = useState<OutputData>({
    home: true,
    showModal: false,
    apiDataPlaying: [],
    apiDataFavorite: [],
    selectedMovie: null,
  });

  const homeButton = (): void => {
    navigate("/");
  };

  const favoriteButton = (): void => {
    navigate("/favorite");
  };

  const favoriteAPI = async () => {
    try {
      const response = await axios.get(`https://658c0031859b3491d3f54070.mockapi.io/Movies`);
      setNilaiOutput((prevNilai) => ({ ...prevNilai, apiDataFavorite: response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const modalBoxFunc = (item: null | Movie) => {
    setNilaiOutput((prevState) => ({ ...prevState, showModal: !prevState.showModal, selectedMovie: item }));
  };

  const deleteAPI = async (id: number) => {
    try {
      const response = await axios.delete(`https://658c0031859b3491d3f54070.mockapi.io/Movies/${id}`);
      if (response.status === 200) {
        alert("Your card have been deleted");
        favoriteAPI();
      } else {
        alert("Failed Response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    favoriteAPI();
  }, []);
  return (
    <>
      <section className="text-slate-100">
        {nilaiOutput.showModal && nilaiOutput.selectedMovie && (
          <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col h-[60%] sm:h-[80%] lg:h-[80%] justify-center items-center bg-white p-6 rounded-lg lg:w-1/4 w-9/12">
              <img src={poster + nilaiOutput.selectedMovie.poster_path} className="h-[30%] sm:h-[50%] w-full" height={30} alt="" />
              <h2 className="sm:text-xl text-base font-bold my-4 text-white text-center py-4 px-5 w-full rounded-md bg-green-500">{nilaiOutput.selectedMovie.title}</h2>
              <p className="text-gray-500  mb-4 text-center tracking-tight">{nilaiOutput.selectedMovie.original_title}</p>

              <div className="flex justify-center items-center">
                <p className={nilaiOutput.selectedMovie.vote_average > 8 ? `text-white font-bold py-2 px-4 bg-green-400` : `text-white font-bold py-2 px-4 bg-yellow-500`}>{nilaiOutput.selectedMovie.vote_average}</p>
                <span className=" cursor-pointer bg-slate-700 hover:bg-slate-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" onClick={() => modalBoxFunc(null)}>
                  Tutup
                </span>
              </div>
            </div>
          </div>
        )}

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

          <div className="right sm:ml-2 w-screen overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2 pt-4 ">
            <div className="h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 px-5">
              {nilaiOutput.apiDataFavorite &&
                nilaiOutput.apiDataFavorite.map((item: any, index: number) => {
                  return <CardFavorite key={index} name={item.title} deskripsi={item.original_title} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => modalBoxFunc(item)} hapus={() => deleteAPI(item.id)} />;
                })}
            </div>
            )
          </div>

          {/* // */}
        </div>
      </section>
    </>
  );
}

export default Favorite;
