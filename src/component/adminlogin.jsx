import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminlogin() {

    const navigate = useNavigate();

    const [email_id, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Emial", email_id)
        console.log("password", password)

        const loginData = {
            email_id: email_id,
            password: password
        };

        try {

            const response = await fetch("http://127.0.0.1:8000/admin_login/read", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {

                sessionStorage.setItem("adminToken", data.token);
                sessionStorage.setItem("adminEmail", email_id);
                sessionStorage.setItem("adminName", data.name)


                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert(data.message || "Invalid Login");

            }

        } catch (error) {

            console.log(error);
            alert("Server Error");

        }

    };

    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow p-4" style={{ width: "400px" }}>

                <h3 className="text-center mb-4">Admin Login</h3>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email_id"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email_id}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Adminlogin;