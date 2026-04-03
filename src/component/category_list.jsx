import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryList() {
 const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch(`${BASE_URL}category/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
    }
  })
    .then(res => {
      if (res.status === 401) {
        alert("Session expired, login again");

        sessionStorage.removeItem("adminToken");
        window.location.href = "/";  

        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return;

      console.log("API DATA", data);

      setCategories(Array.isArray(data) ? data : []);
    })
    .catch(error => console.log(error));
}, [BASE_URL]);


  // DELETE FUNCTION
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}category/delete/${id}`, {
        method: "DELETE",
        headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
        }

      });

      if (response.ok) {

        // UI se remove kar denge
        setCategories(categories.filter(cat => cat.category_id !== id));

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

        <h3>Category List</h3>

        <Link to="/add_category" className="btn btn-primary">
          Add Category
        </Link>

      </div>
    
      <table className="table table-striped">

        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {categories.map((cat) => (
            <tr key={cat.category_id}>

              <td>{cat.category_id}</td>
              <td>{cat.name}</td>
              <td>{cat.is_active ? "Yes" : "No"}</td>

              <td>
                <Link to={`/edit_category/${cat.category_id}`} className="btn btn-warning btn-sm">
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(cat.category_id)}
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

export default CategoryList;