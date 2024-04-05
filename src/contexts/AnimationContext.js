import { createContext, useReducer } from "react";
const AnimateReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":

      return {
       animation:true
      };
    case "HIDE":

      return {
        animation:false
      }
    default:
      return state;
  }
};

const AnimateContext = createContext();

const AnimateProvider = ({ children }) => {
  const [animate, AnimateDispatch] = useReducer(AnimateReducer, {animation: false});

 

  return (
    <AnimateContext.Provider value={{ animate, AnimateDispatch }}>
      {children}
    </AnimateContext.Provider>
  );
};
export { AnimateProvider };
export default AnimateContext;
