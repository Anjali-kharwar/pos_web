import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validationForm } from "../utils/validation";

function AddUserDetail() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email_id: "",
    is_active: true,
    updated_by: 1,
    created_by: 1,
  });

  const [errors, setErrors] = useState({});

  // ✅ EDIT DATA LOAD
  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}user_details/edit/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("adminToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((error) => console.log(error));
    }
  }, [BASE_URL, id]);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "is_active") {
      value = value === "true";
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // remove error when user types
    setErrors({ ...errors, [name]: "" });
  };

  const requiredFields = [
    "first_name",
    "last_name",
    "email_id",
    "password",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validationForm(formData, requiredFields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      let url = "";
      let method = "";

      if (id) {
        url = `${BASE_URL}user_details/update/${id}`;
        method = "PUT";
      } else {
        url = `${BASE_URL}user_details/save`;
        method = "POST";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("adminToken"),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(id ? "User Updated Successfully" : "User Added Successfully");
        navigate("/user_list");
      } else {
        alert("Error: " + (data?.detail || "Something went wrong"));
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h3 className="text-xl font-bold mb-4 text-center">
          {id ? "Edit User" : "Add User"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="first_name"
              className={`form-control ${errors.first_name ? "border-red-500" : ""}`}
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <small style={{ color: "red" }}>{errors.first_name}</small>
            )}
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              className={`form-control ${errors.last_name ? "border-red-500" : ""}`}
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <small style={{ color: "red" }}>{errors.last_name}</small>
            )}
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              name="email_id"
              className={`form-control ${errors.email_id ? "border-red-500" : ""}`}
              value={formData.email_id}
              onChange={handleChange}
            />
            {errors.email_id && (
              <small style={{ color: "red" }}>{errors.email_id}</small>
            )}
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="text"
              name="password"
              className={`form-control ${errors.password ? "border-red-500" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small style={{ color: "red" }}>{errors.password}</small>
            )}
          </div>

          <div className="mb-3">
            <label>Status</label>
            <select
              className="form-control"
              name="is_active"
              value={formData.is_active ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
                    Submit
                </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserDetail;