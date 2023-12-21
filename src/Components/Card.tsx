import { Component } from "react";

interface dataFilm {
  name: string;
  gambar: string;
  deskripsi: string;
  rating: number;
  detail: () => void;
}

export class Card extends Component<dataFilm> {
  render() {
    const { name, gambar, deskripsi, rating, detail } = this.props;
    return (
      <div className="flex flex-col w-11/12 bg-primary opacity-95 mt-10">
        <img src={gambar} alt="" className="h-1/3" />
        <div className="title text-center bg-green-500">
          <h3 className="font-semibold drop-shadow-md">{name}</h3>
        </div>
        <p className="text-sm mt-2 mb-2 text-center text-slate-400 ">{deskripsi}</p>
        <div className="rating flex justify-center items-center rounded-md mb-5">
          <span className={rating > 8 ? `bg-green-300 px-5 font-bold}` : `bg-yellow-500 px-5 font-bold`}>{rating}</span>
          <span className="px-5 bg-slate-800 font-medium cursor-pointer" onClick={detail}>
            Detail
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
