import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {CardsPage, HomePage} from "./pages";


function App() {
  return (
      <Routes>
        <Route path={'/'} element={<MainLayout/>}>
          <Route index element={<Navigate to={'/home'}/>}/>
            <Route path={'/home'} element={<HomePage/>}/>
            <Route path={'/cards'} element={<CardsPage/>}/>
        </Route>
        {/*<Route path={'*'} element={<NotFoundPage/>}/>*/}
      </Routes>
  );
}

export default App;
