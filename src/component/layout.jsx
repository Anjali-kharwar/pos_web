import React, { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

function Layout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (

        <div className="d-flex flex-column min-vh-100">

            <Header toggleSidebar={toggleSidebar} />

            <div className="d-flex flex-grow-1">

                {sidebarOpen && <Sidebar />}

                <div className="flex-grow-1 p-4">
                    {children}
                </div>

            </div>

            <Footer />

        </div>

    );

}

export default Layout;