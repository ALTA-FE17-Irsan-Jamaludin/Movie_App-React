import { useState, useEffect, FC } from "react";
import CardFavorite from "./Components/CardFavorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Left from "./Components/Left";
import { Movie } from "./Utils/typeInterface";
import { OutputDataFavorite } from "./Utils/typeInterface";

const Favorite: FC = () => {
  const navigate = useNavigate();
  const poster = `https://image.tmdb.org/t/p/w500/`;

  const [nilaiOutput, setNilaiOutput] = useState<OutputDataFavorite>({
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
            <div className="relative flex flex-col h-auto sm:h-auto lg:h-[80%] justify-center items-center bg-white sm:p-6 p-3 rounded-lg lg:w-1/4 w-9/12">
              <img src={poster + nilaiOutput.selectedMovie.poster_path} className="h-[60%] sm:h-[80%] w-full" height={30} alt="" />
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
          <Left searchInput={undefined} homeButton={homeButton} favoriteButton={favoriteButton}>
            {nilaiOutput.apiDataFavorite &&
              nilaiOutput.apiDataFavorite.map((item: any, index: number) => {
                return <CardFavorite key={index} name={item.title} deskripsi={item.original_title} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => modalBoxFunc(item)} hapus={() => deleteAPI(item.id)} />;
              })}
          </Left>

          {/* // */}
        </div>
      </section>
    </>
  );
};

export default Favorite;
