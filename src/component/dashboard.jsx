import React from "react";


function Dashboard() {


    return (

        <div className="p-4">


            <h2 className="text-center mb-4">Admin Dashboard</h2>

            <div className="row">

                <div className="col-md-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Total Users</h5>
                            <h3>120</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Total Orders</h5>
                            <h3>80</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Total Products</h5>
                            <h3>45</h3>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Dashboard;