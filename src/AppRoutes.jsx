import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Adminlogin from "./component/adminlogin";
import Dashboard from "./component/dashboard";
import CategoryList from "./component/category_list";
import Layout from "./component/layout";
import AddCategory from "./component/addcategory";
import PrivateRoute from "./component/PrivateRoute";
import AddProduct from "./component/product_details";
import ProductList from "./component/product_list";
import AddUserDetail from"./component/user_detail";
import UsertList from "./component/user_list";
import AddadminLogin from"./component/admin";
import AdminList from "./component/admin_list";




function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Adminlogin />} />
                <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
                <Route path="/category_list" element={<PrivateRoute><Layout><CategoryList /></Layout></PrivateRoute>} />
                <Route path="/add_category" element={<PrivateRoute><Layout><AddCategory /></Layout></PrivateRoute>} />
                <Route path="/edit_category/:id" element={<PrivateRoute><Layout><AddCategory /></Layout></PrivateRoute>} />
                <Route path="/add_products" element={<PrivateRoute><Layout><AddProduct/></Layout></PrivateRoute>}/>
                <Route path="/product_list" element={<PrivateRoute><Layout><ProductList /></Layout></PrivateRoute>} />
                <Route path="/edit_product/:id" element={<PrivateRoute><Layout><AddProduct/></Layout></PrivateRoute>}/>
                <Route path="/add_user_detail" element={<PrivateRoute><Layout><AddUserDetail/></Layout></PrivateRoute>}/>
                <Route path="/user_list" element={<PrivateRoute><Layout><UsertList /></Layout></PrivateRoute>} />
                <Route path="/edit_user/:id" element={<PrivateRoute><Layout><AddUserDetail/></Layout></PrivateRoute>}/>
                <Route path="/add_admin" element={<PrivateRoute><Layout><AddadminLogin /></Layout></PrivateRoute>} /> 
                <Route path="/admin_list" element={<PrivateRoute><Layout><AdminList /></Layout></PrivateRoute>} />
                 <Route path="/edit_admin/:id" element={<PrivateRoute><Layout><AddadminLogin/></Layout></PrivateRoute>}/>



            </Routes>
        </BrowserRouter>    
    );
}

export default AppRoutes;