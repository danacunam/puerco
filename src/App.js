import { Suspense } from "react";
import "./App.scss";
import MainRouter from "./router/MainRouter";
import Loader from "./components/Loader";
import { DataProvider } from "./contexts/DataContext";
import { AnimateProvider } from "./contexts/AnimationContext";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <DataProvider>
          <AnimateProvider>
            <MainRouter />
          </AnimateProvider>
        </DataProvider>
      </Suspense>
    </>
  );
}

export default App;
