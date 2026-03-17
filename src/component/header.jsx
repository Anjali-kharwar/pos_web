import React from "react";

function Header({ toggleSidebar }) {

    const name = sessionStorage.getItem("adminName");

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

                    {/*  NAME SHOW */}
                    <span className="text-white">
                        Welcome {name}
                    </span>

                    <button className="btn btn-danger">
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Header;