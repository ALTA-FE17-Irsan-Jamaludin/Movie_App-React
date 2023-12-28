interface dataFilm {
  name: string;
  gambar: string;
  deskripsi: string;
  rating: number;
  detail: () => void;
}

function CardFavorite(props: dataFilm) {
  const { name, gambar, deskripsi, rating, detail } = props;

  return (
    <div className="flex flex-col h-[20rem] sm:w-11/12 rounded-md overflow-hidden shadow-sm bg-primary opacity-95 mt-5">
      <img src={gambar} alt="" width={240} className="h-[50%] bg-cover" />
      <div className="title text-center h-[17%] bg-teal-500 overflow-y-auto">
        <h3 className="font-semibold drop-shadow-md px-3">{name}</h3>
      </div>
      <p className="overflow-hidden text-sm mt-2 mb-2 text-center text-slate-400 h-[15%] px-2 ">{deskripsi}</p>
      <div className="bottom flex justify-center mb-3 items-center">
        <div className="rating flex justify-center items-center rounded-sm overflow-hidden ">
          <span className={rating > 8 ? `bg-green-300 px-5 font-bold}` : `bg-yellow-500 px-5 font-bold`}>{rating}</span>
          <span className="px-5 bg-slate-800 font-medium cursor-pointer" onClick={detail}>
            Detail
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardFavorite;
