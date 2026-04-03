import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminList() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [admins, setadmins] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}admin_login/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
            }
        })
            .then(res => res.json())
            .then(data => {
                setadmins(data);
            })
            .catch(error => console.log(error));

    }, [BASE_URL]);

    
  // DELETE FUNCTION
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete ?")) {
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}admin_login/delete/${id}`, {
        method: "DELETE",
        headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
        }

      });

      if (response.ok) {

        // UI se remove kar denge
        setadmins(admins.filter(admin => admin.id !== id));

      } else {
        alert("Delete failed");
      }

    } catch (error) {
      console.log(error);
    }

  };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h3>Admin List</h3>

                <Link to="/add_admin" className="btn btn-primary">
                    Add  Admin
                </Link>
            </div>
            <table className="table table-striped">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>email id</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {admins.map((admin) => (
                        <tr>

                            <td>{admin.id}</td>
                            <td>{admin.name}</td>
                            <td>{admin.email_id}</td>
                

                            <td>
                                <Link to={`/edit_admin/${admin.id}`} className="btn btn-warning btn-sm">
                                    Edit
                                </Link>

                                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  Delete
                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>

        </div>

    );
}
export default AdminList;