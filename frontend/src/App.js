import {Navigate, Route, Routes} from "react-router-dom";

import {
    AccountPage,
    AdminPage,
    DeviceDetailsPage,
    DevicesPage,
    LoginPage, NewPasswordAfterForgotPage,
    NotFoundPage,
    OrderPage,
    PasswordForgotPage,
    PaymentPage,
    RegisterPage
} from "./pages";
import {MainLayout} from "./layouts";
import {PrivateRoute} from "./utils";


function App() {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'/devices'}/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/password/forgot'} element={<PasswordForgotPage/>}/>
                <Route path={'/password/new'} element={<NewPasswordAfterForgotPage/>}/>
                <Route path={'/devices'} element={<DevicesPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path={'/devices/:id'} element={<DeviceDetailsPage/>}/>
                    <Route path={'/account'} element={<AccountPage/>}/>
                    <Route path={'/order'} element={<OrderPage/>}/>
                    <Route path={'/order/payment/:accountId'} element={<PaymentPage/>}/>
                    <Route path={'/admin'} element={<AdminPage/>}/>
                </Route>
            </Route>
            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;