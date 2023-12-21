import { Component } from "react";
import Card from "./Components/Card";
import favoriteFilm from "./Data/movie_data.json";
import PlayingMovie from "./Data/playing_data.json";

interface Movie {
  judul: string;
  deskripsi: string;
  gambar: string;
  rating: number;
}

interface OutputData {
  play: boolean;
  showModal: boolean;
  selectedMovie: Movie | null;
}

export class App extends Component<{}, OutputData> {
  state: OutputData = {
    play: true,
    showModal: false,
    selectedMovie: null,
  };

  playButton = () => {
    const { play } = this.state;
    if (play === true) {
      play;
    } else {
      this.setState({ play: !play });
    }
  };

  favoriteButton = () => {
    const { play } = this.state;
    if (play === false) {
      play;
    } else {
      this.setState({ play: !play });
    }
  };

  toggleModal = (item: Movie | null) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      selectedMovie: item,
    }));
  };

  render() {
    return (
      <>
        <section>
          {this.state.showModal && this.state.selectedMovie && (
            <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="relative flex flex-col justify-center items-center bg-white p-6 rounded-lg w-1/4">
                <img src={this.state.selectedMovie.gambar} alt="" />
                <h2 className="text-xl font-bold my-4 text-white text-center py-4 px-5 w-full rounded-md bg-green-500">{this.state.selectedMovie.judul}</h2>
                <p className="text-gray-500 mb-4 text-center  tracking-tight">{this.state.selectedMovie.deskripsi}</p>

                <div className="flex justify-center items-center">
                  <p className={this.state.selectedMovie.rating > 8 ? `text-white font-bold py-2 px-4 bg-green-400` : `text-white font-bold py-2 px-4 bg-yellow-500`}>{this.state.selectedMovie.rating}</p>
                  <span className=" cursor-pointer bg-slate-700 hover:bg-slate-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" onClick={() => this.toggleModal(null)}>
                    Tutup
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className=" flex justify-center items-center h-screen w-screen">
            <div className="left flex flex-col justify-center items-center border-r-2 border-slate-400 h-screen w-2/5 shadow-md bg-zinc-900">
              <span className=" font-bold text-3xl drop-shadow-md">Movies App</span>
              <div className="search h-14 rounded-lg w-72 bg-slate-100 flex justify-between items-center  my-5 ">
                <div className="icon-search flex flex-col w-1/4 h-full justify-center items-center">
                  <img width="24" height="24" src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="search--v1" />
                </div>
                <input type="text" className="bg-slate-50 w-full h-[3.1rem] text-black rounded-lg text-center font-semibold border-b-slate-500 mr-1" />
              </div>

              <div className="grid grid-cols-1 gap-5 w-11/12 my-5 px-3">
                <button className="shadow-md px-5 py-8 bg-slate-200 flex justify-evenly items-center opacity-95" onClick={this.favoriteButton}>
                  <img width="64" height="64" src="https://img.icons8.com/3d-fluency/94/love-circled.png" alt="love-circled" />
                  <span className="text-2xl font-bold text-white drop-shadow-md"> Favorite Movies</span>
                </button>
                <button className=" shadow-md px-5 py-8 bg-slate-200 flex justify-evenly items-center opacity-95" onClick={this.playButton}>
                  <img width="64" height="64" src="https://img.icons8.com/3d-fluency/94/film-reel.png" alt="film-reel" />
                  <span className="text-2xl font-bold text-white drop-shadow-md "> Playing Movies</span>
                </button>
              </div>
            </div>

            <div className="right w-full h-full flex flex-col justify-center items-center sticky ">
              <h1 className="font-bold">{this.state.play === false ? "Favorite Movies" : `Playing Movies`}</h1>
              {this.state.play === false ? (
                <div className=" grid grid-cols-4 items-center justify-center gap-5 px-5">
                  {favoriteFilm.film &&
                    favoriteFilm.film.map((item: any, index: number) => {
                      return <Card key={index} name={item.judul} deskripsi={item.deskripsi} gambar={item.gambar} rating={item.rating} detail={() => this.toggleModal(item)} />;
                    })}
                </div>
              ) : (
                <div className=" grid grid-cols-4 items-center justify-center gap-5 px-5">
                  {PlayingMovie.film &&
                    PlayingMovie.film.map((item: any, index: number) => {
                      return <Card key={index} name={item.judul} deskripsi={item.deskripsi} gambar={item.gambar} rating={item.rating} detail={() => this.toggleModal(item)} />;
                    })}
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default App;
