import React from "react";
import { Route, Routes } from "react-router";
import DefaultLayout from "./components/layout/DefaultLayout";
import HomePage from "./pages/homePage/HomePage";
import "./App.css";
import RoleListPage from "./pages/rolePage/RoleListPage";
import UserListPage from "./pages/userPage/UserListPage";
import CarListPage from "./pages/carPage/CarListPage";
import CreateCarPage from "./pages/carPage/CreateCarPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<HomePage />} />
                <Route path="role" element={<RoleListPage />} />
                <Route path="user" element={<UserListPage />} />
                <Route path="car">
                    <Route index element={<CarListPage />} />
                    <Route path="create" element={<CreateCarPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
