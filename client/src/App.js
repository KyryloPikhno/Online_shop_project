import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {DevicesPage, LoginPage, NotFoundPage, OrderPage, RegisterPage} from "./pages";


function App() {

  return (
      <Routes>
        <Route path={'/'} element={<MainLayout/>}>
          <Route index element={<Navigate to={'/login'}/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/devices'} element={<DevicesPage/>}/>
            <Route path={'/order' } element={<OrderPage/>}/>
        </Route>
        <Route path={'*'} element={<NotFoundPage/>}/>
      </Routes>
  );
}

export default App;
