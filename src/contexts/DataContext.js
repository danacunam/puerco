import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { url } from "../helpers/info";
const DataReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
       ...action.data,
      };
    default:
      return state;
  }
};

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, dispatch] = useReducer(DataReducer, {});

  const getData = async () => {
    await axios.get(`${url}?endpoint=obtener-data`).then((res) => {
      dispatch({ type: "SET_DATA", data: res.data });
    });
  };

  useEffect(() => {
    getData()

  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};
export { DataProvider };
export default DataContext;
