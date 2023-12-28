import { useState, useEffect } from "react";
import Card from "./Components/Card";
import optionsHome from "./Data/optionsPopular";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Movie {
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
  searchData: string;
  selectedMovie: Movie | null;
}

function Home() {
  const poster = `https://image.tmdb.org/t/p/w500/`;
  const navigate = useNavigate();

  const [nilaiOutput, setNilaiOutput] = useState<OutputData>({
    home: true,
    showModal: false,
    apiDataPlaying: [],
    apiDataFavorite: [],
    selectedMovie: null,
    searchData: "",
  });

  const homeButton = (): void => {
    navigate("/");
  };

  const favoriteButton = (): void => {
    navigate("/favorite");
  };

  const homeAPI = async () => {
    try {
      const response = await axios.request(optionsHome);
      setNilaiOutput((prevNilai) => ({ ...prevNilai, apiDataPlaying: response.data.results }));
    } catch (error) {
      console.log(error);
    }
  };

  const searchAPI = async () => {
    if (nilaiOutput.searchData !== "") {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${nilaiOutput.searchData}&api_key=f150276c4e0b2101017c933bd6f025ce`);
        setNilaiOutput((prevNilai) => ({ ...prevNilai, apiDataPlaying: response.data.results }));
      } catch (error) {
        console.log(error);
      }
    } else {
      homeAPI();
    }
  };

  const kirimAPI = async (item: Movie) => {
    const { title, original_title, vote_average, poster_path } = item;

    await axios
      .post(`https://658c0031859b3491d3f54070.mockapi.io/Movies`, { title, original_title, vote_average, poster_path })
      .then(() => {
        alert("Great, you've added the movie");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalBoxFunc = (item: null | Movie) => {
    setNilaiOutput((prevState) => ({ ...prevState, showModal: !prevState.showModal, selectedMovie: item }));
  };

  useEffect(() => {
    searchAPI();
  }, [searchAPI]);
  return (
    <>
      <section>
        {nilaiOutput.showModal && nilaiOutput.selectedMovie && (
          <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative flex flex-col h-[60%] sm:h-[60%] lg:h-[80%] justify-center items-center bg-white p-6 rounded-lg lg:w-1/4 w-9/12">
              <img src={poster + nilaiOutput.selectedMovie.poster_path} className="h-[80%] w-full" height={30} alt="" />
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

            <div className="search h-14 rounded-lg w-72 bg-slate-100 flex justify-between items-center mt-5 ">
              <div className="icon-search flex flex-col w-1/4 h-full justify-center items-center">
                <img width="24" height="24" src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="search--v1" />
              </div>
              <input
                onChange={(e) => setNilaiOutput((prevData) => ({ ...prevData, searchData: e.target.value }))}
                type="text"
                className="bg-slate-50 w-full h-[3.1rem] text-black rounded-lg text-center font-semibold border-b-slate-500 mr-1"
              />
            </div>

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

          {/* <h1 className="font-bold ">{nilaiOutput.home === false ? "Favorite Movies" : `Playing Movies`}</h1> */}
          <div className="right sm:ml-2 w-screen overflow-y-auto lg:h-[92%] h-full flex flex-col justify-center items-center gap-2 ">
            <div className="h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 px-5">
              {nilaiOutput.apiDataPlaying &&
                nilaiOutput.apiDataPlaying.map((item: any, index: number) => {
                  return <Card key={index} name={item.title} deskripsi={item.original_title} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => modalBoxFunc(item)} addFavorit={() => kirimAPI(item)} />;
                })}
            </div>
          </div>

          {/* // */}
        </div>
      </section>
    </>
  );
}

export default Home;
