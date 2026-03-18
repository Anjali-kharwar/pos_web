import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validationForm } from "../utils/validation";

function AddCategory() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        parent_id: "",
        is_active: true,
        updated_by: 1,
        created_by: 1
    });

    const [errors, setErrors] = useState({});
    console.log(formData.short_desc);

    // load parent categories
    useEffect(() => {

        fetch("http://127.0.0.1:8000/category/list")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.log(error));

    }, []);


    // EDIT DATA LOAD
    useEffect(() => {

        if (id) {

            fetch(`http://127.0.0.1:8000/category/edit/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData(data);
                })
                .catch(error => console.log(error));

        }

    }, [id]);


    const handleChange = (e) => {

        const name = e.target.name;
        let value = e.target.value;

        if (name === "is_active") {
            value = value === "true";
        }

        if (name === "parent_id" && value === "") {
            value = null;
        }

        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }

    };


    const requiredFields = ["name"];


    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validationForm(formData, requiredFields);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        let url = "http://127.0.0.1:8000/category/save";
        let method = "POST";

        if (id) {
            url = `http://127.0.0.1:8000/category/update/${id}`;
            method = "PUT";
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer " + sessionStorage.getItem("adminToken")
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(id ? "Category Updated Successfully" : "Category Added Successfully");
                navigate("/category_list");
            } else {
                alert("Error: " + data.detail);
            }

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="container mt-4">

            <h3>{id ? "Edit Category" : "Add Category"}</h3>

            <form className="w-50" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Category Name</label>

                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    {errors.name && (
                        <small style={{ color: "red" }}>{errors.name}</small>
                    )}

                </div>



                <div className="mb-3">
                    <label className="form-label">Parent Category</label>

                    <select
                        className="form-control"
                        name="parent_id"
                        value={formData.parent_id || ""}
                        onChange={handleChange}
                    >

                        <option value="0">Select Parent Category</option>

                        {categories.map((cat) => (

                            <option key={cat.category_id} value={cat.category_id}>
                                {cat.name}
                            </option>

                        ))}

                    </select>

                </div>

            
                <div className="mb-3">
                    <label className="form-label">Status</label>

                    <select
                        className="form-control" name="is_active"
                        value={formData.is_active.toString()}
                        onChange={handleChange}
                    >

                        <option value="true">Active</option>
                        <option value="false">Inactive</option>

                    </select>

                </div>


                <button type="submit" className="btn btn-primary">
                    {id ? "Update Category" : "Add Category"}
                </button>

            </form>

        </div>

    );

}

export default AddCategory;