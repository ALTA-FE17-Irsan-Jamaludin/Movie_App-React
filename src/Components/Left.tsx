import { ReactEventHandler, ReactNode } from "react";
import { FC } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import gambarLogOut from "../img/icons8-log-out-50.png";

interface TypeLeft {
  searchInput?: (e: any) => void;
  homeButton: () => void;
  favoriteButton: ReactEventHandler;
  children?: ReactNode;
}

const Left: FC<TypeLeft> = (props: TypeLeft) => {
  const { searchInput, homeButton, favoriteButton, children } = props;
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const logOut = (): void => {
    if (username) {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure to Logout ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "rgb(13 148 136)",
      }).then((result) => {
        if (result.value) {
          Cookies.remove("username");
          navigate("/");
        }
      });
    }
  };

  const logIn = (): void => {
    navigate("/");
  };

  return (
    <div className=" flex sm:flex-row flex-col justify-center items-center h-screen w-screen">
      <div className="left bg-teal-600 h-1/3 sm:h-full flex flex-col justify-center items-center border-r-2 border-slate-400  sm:w-[50%] lg:w-[35%] w-screen shadow-md">
        <span className=" font-bold text-3xl mt-5 sm:mt-0 drop-shadow-md">Movies App</span>

        <div className={`search h-9 w-9/12 lg:h-14 rounded-lg lg:w-72 bg-slate-100 flex justify-between items-center mt-5 ${searchInput === undefined ? `hidden` : `block`} `}>
          <div className="icon-search flex flex-col w-1/4 h-full justify-center items-center">
            <img width="24" height="24" src="https://img.icons8.com/cotton/64/000000/search--v1.png" alt="search--v1" />
          </div>
          <input onChange={searchInput ? (e: any) => searchInput(e) : undefined} type="text" className={`bg-slate-50 h-[1.8rem] pl-5 w-full lg:h-[3.1rem] text-black rounded-lg  font-semibold border-b-slate-500 mr-1 `} />
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
        <div className="sm:flex gap-5 m-3  hidden">
          {username ? (
            <button className=" text-xs  w-[8rem] flex justify-center items-center font-bold  bg-teal-800 " onClick={logOut}>
              <img src={gambarLogOut} alt="" />
              Logout
            </button>
          ) : (
            <button className=" text-xs  w-[8rem] flex justify-center items-center  font-bold bg-teal-800 " onClick={logIn}>
              <img src={gambarLogOut} alt="" />
              Login
            </button>
          )}
        </div>

        <hr />
      </div>

      {children}
    </div>
  );
};

export default Left;
