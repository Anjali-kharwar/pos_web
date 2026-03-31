import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UsertList() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}user_details/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.log(error));

    }, [BASE_URL]);

    
  // DELETE FUNCTION
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}user_details/delete/${id}`, {
        method: "DELETE",
        headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
        }

      });

      if (response.ok) {

        // UI se remove kar denge
        setUsers(users.filter(user => user.id !== id));

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

                <h3>User List</h3>

                <Link to="/add_user_detail" className="btn btn-primary">
                    Add  User
                </Link>
            </div>
            <table className="table table-striped">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>last name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {users.map((user) => (
                        <tr>

                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.status}</td>
                            <td>{user.is_active ? "Yes" : "No"}</td>

                            <td>
                                <Link to={`/edit_user/${user.id}`} className="btn btn-warning btn-sm">
                                    Edit
                                </Link>

                                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
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
export default UsertList;