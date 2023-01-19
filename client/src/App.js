import {Navigate, Route, Routes} from "react-router-dom";

import {
    AccountPage,
    AdminPage,
    DeviceDetailsPage,
    DevicesPage,
    LoginPage,
    NotFoundPage,
    OrderPage,
    RegisterPage
} from "./pages";
import {MainLayout} from "./layouts";


function DevicesDetailPage() {
    return null;
}

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'/login'}/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/devices'} element={<DevicesPage/>}/>
                <Route path={'/devices/:id'} element={<DeviceDetailsPage/>}/>
                <Route path={'/order'} element={<OrderPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
                <Route path={'/admin'} element={<AdminPage/>}/>
            </Route>
            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;
