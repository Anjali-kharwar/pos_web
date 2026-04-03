import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div style={{
            width: "250px",
            background: "#343a40",
            color: "white",
            minHeight: "100vh",
            padding: "20px"
        }}>


            <ul style={{ listStyle: "none", padding: "0" }}>

                <li className="mb-3">
                    <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
                        Dashboard
                    </Link>
                </li>

                <li className="mb-3">
                    <Link to="/category_list" style={{ color: "white", textDecoration: "none" }}>
                        Categories
                    </Link>
                </li>

                {/* <li className="mb-3">
                    <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
                        Orders
                    </Link>
                </li> */}

                <li className="mb-3">
                    <Link to="/product_list" style={{ color: "white", textDecoration: "none" }}>
                        Products 
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/user_list" style={{ color: "white", textDecoration: "none" }}>
                        User Details
                    </Link>
                </li>
                 <li className="mb-3">
                    <Link to="/admin_list" style={{ color: "white", textDecoration: "none" }}>
                        Admin
                    </Link>
                </li>

            </ul>
        </div>

    );

}

export default Sidebar;