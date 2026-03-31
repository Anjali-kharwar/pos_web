import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {

    const navigate = useNavigate(); //  add this
    const name = sessionStorage.getItem("adminName");

    const handleLogout = () => {
        sessionStorage.clear(); //  token + name remove
        navigate("/");     //  redirect
    };

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container-fluid d-flex justify-content-between">

                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-light"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    <span className="navbar-brand ms-3">
                        Admin Panel
                    </span>
                </div>

                <div className="d-flex align-items-center gap-3">

                    {/* NAME SHOW */}
                    <span className="text-white">
                        Welcome {name}
                    </span>

                    {/*  LOGOUT FIX */}
                    <button 
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Header;