import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adminlogin from "./component/adminlogin";
import Dashboard from "./component/dashboard";
import CategoryList from "./component/category_list";
import Layout from "./component/layout";
import AddCategory from "./component/addcategory";
import PrivateRoute from "./component/PrivateRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Adminlogin />} />
                <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
                <Route path="/category_list" element={<PrivateRoute><Layout><CategoryList /></Layout></PrivateRoute>} />
                <Route path="/add_category" element={<PrivateRoute><Layout><AddCategory /></Layout></PrivateRoute>} />
                <Route path="/edit_category/:id" element={<PrivateRoute><Layout><AddCategory /></Layout></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;