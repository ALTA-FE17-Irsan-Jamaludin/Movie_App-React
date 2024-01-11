import { useState, useContext, createContext, FC } from "react";
import Swal from "sweetalert2";
import { ContextFavoritProps } from "../Utils/typeInterface";
import BaseUrl from "axios";

const stateContext = createContext({} as ContextFavoritProps);

export const useStateContext = () => {
  const context: any = useContext(stateContext);
  const { apiData } = context;

  const handlefavoriteAPI = async () => {
    try {
      const response = await BaseUrl.get(``);
      context.setApiData(response.data);
    } catch (error) {
      Swal.fire({
        title: "Your API Error",
        text: "Please check your Connection",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return {
    apiData,
    handlefavoriteAPI,
  };
};

export const StateProvider: FC<ContextFavoritProps> = ({ children }) => {
  const [apiData, setApiData] = useState<any[]>([]);
  return <stateContext.Provider value={{ apiData, setApiData }}>{children}</stateContext.Provider>;
};
