import { useState, useEffect, FC } from "react";
import Card from "./Components/Card";
import optionsHome from "./Data/optionsPopular";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Left from "./Components/Left";
import { OutputData } from "./Utils/typeInterface";
import { Movie } from "./Utils/typeInterface";

const Home: FC = () => {
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
    if (item) {
      const location = {
        pathname: `/detail/`,
        search: `?id=${item.id}`,
      };
      navigate(location);
    }
  };

  useEffect(() => {
    searchAPI();
  }, [searchAPI]);

  return (
    <>
      <section className="text-slate-100">
        <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
          <Left searchInput={(e: any) => setNilaiOutput((prev) => ({ ...prev, searchData: e.target.value }))} homeButton={homeButton} favoriteButton={favoriteButton}>
            {nilaiOutput.apiDataPlaying &&
              nilaiOutput.apiDataPlaying.map((item: any, index: number) => {
                return <Card key={index} id={item.id} name={item.title} deskripsi={item.original_title} gambar={poster + item.poster_path} rating={item.vote_average} detail={() => modalBoxFunc(item)} addFavorit={() => kirimAPI(item)} />;
              })}
          </Left>
          {/* // */}
        </div>
      </section>
    </>
  );
};

export default Home;
