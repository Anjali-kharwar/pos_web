import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validationForm } from "../utils/validation";


function AddProduct() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [products, setproducts] = useState([])

    const navigate = useNavigate();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState("")


    useEffect(() => {

        fetch(`${BASE_URL}category/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
            }
        })
            .then(res => res.json())
            .then(data => {
                setproducts(data);
                console.log("data", data)
            })
            .catch(error => console.log(error));

    }, [BASE_URL]);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    sleep(1000);
    // EDIT DATA LOAD
    useEffect(() => {

        if (id) {

            fetch(`${BASE_URL}product_details/edit/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
                }
            })
                .then(res => res.json())
                .then(data => {
                    setFormData(data);
                    console.log("HHH", data)

                    setImageUrl(`${BASE_URL}uploads/${data.image}`)
                })
                .catch(error => console.log(error));

        }

    }, [BASE_URL, id]);



    const [formData, setFormData] = useState({
        name: "",
        description: "",
        short_description: "",
        sku_code: "",
        sale_price: "",
        cost_price: "",
        mrp: "",
        qty: "",
        unit_of_measure: "",
        image: "",
        is_active: true,
        updated_by: 1,
        created_by: 1,
        category_id: ""
    });
    const [errors, setErrors] = useState({});
    console.log(formData);


    //image uplode handlechange

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append("file", file); //  key value 

        try {
            const res = await fetch(`${BASE_URL}product_details/image_upload`, {
                method: "POST",
                body: data
            });

            const result = await res.json();
            console.log("UPLOAD RESPONSE:", result);
            setImageUrl(`${BASE_URL}uploads/${result.image_url}`)


            //  correct state update
            setFormData(prev => ({
                ...prev,
                image: result.image_url,
                category_id: result.category_id
            }));

        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const handleChange = (e) => {

        const name = e.target.name;
        let value = e.target.value;

        if (name === "is_active") {
            value = value === "true";

        if(e.target.type ==="file"){
            value = e.target.files[0];
        }
        }
        if (name === "category_id" && value === "") {
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



    const requiredFields = [
        "name",
        "short_description",
        "description",
        "sku_code",
        "sale_price",
        "cost_price",
        "mrp",
        "image",
        "qty",
        "unit_of_measure",

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
                url = `${BASE_URL}product_details/update/${id}`;
                method = "PUT";
            } else {
                url = `${BASE_URL}product_details/save`;
                method = "POST";
            }



            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
                },
                body: JSON.stringify({
                    ...formData,
                    image: formData.image,
                    category_id: parseInt(formData.category_id)


                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(id ? "Product Updated Successfully" : "Product Added Successfully");
                navigate("/product_list");
            } else {
                alert("Error: " + (data?.detail || "Something went wrong"));
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Something went wrong");
        }
    };
    return (
        <div className="container mt-4">
            <form className="w-50" onSubmit={handleSubmit}>

                {/* NAME */}
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>

                {/* SHORT DESC */}
                <div className="mb-3">
                    <label>Short Description</label>
                    <input
                        type="text"
                        name="short_description"
                        value={formData.short_description || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.short_description && (
                        <p style={{ color: "red" }}>{errors.short_description}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label>Product Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                        
                    />
                    {errors.image && (
                        <p style={{ color: "red" }}>{errors.image}</p>
                    )}
                    <input
                        type="hidden"
                        name="image"
                        value={formData.image}
                    />
                    <img
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            marginTop: "10px"
                        }}
                        src={imageUrl} alt="uploaded" />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.description && (
                        <p style={{ color: "red" }}>{errors.description}</p>
                    )}
                </div>

                {/* SKU */}
                <div className="mb-3">
                    <label>SKU Code</label>
                    <input
                        type="text"
                        name="sku_code"
                        value={formData.sku_code || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.sku_code && (
                        <p style={{ color: "red" }}>{errors.sku_code}</p>
                    )}
                </div>

                {/* SALE PRICE */}
                <div className="mb-3">
                    <label>Sale Price</label>
                    <input
                        type="number"
                        name="sale_price"
                        value={formData.sale_price || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.sale_price && (
                        <p style={{ color: "red" }}>{errors.sale_price}</p>
                    )}
                </div>

                {/* COST PRICE */}
                <div className="mb-3">
                    <label>Cost Price</label>
                    <input
                        type="number"
                        name="cost_price"
                        value={formData.cost_price || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.cost_price && (
                        <p style={{ color: "red" }}>{errors.cost_price}</p>
                    )}
                </div>

                {/* MRP */}
                <div className="mb-3">
                    <label>MRP</label>
                    <input
                        type="number"
                        name="mrp"
                        value={formData.mrp || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.mrp && <p style={{ color: "red" }}>{errors.mrp}</p>}
                </div>

                {/* QTY */}
                <div className="mb-3">
                    <label>Qty</label>
                    <input
                        type="number"
                        name="qty"
                        value={formData.qty || ""}
                        className="form-control"
                        onChange={handleChange}
                    />
                    {errors.qty && <p style={{ color: "red" }}>{errors.qty}</p>}
                </div>

                {/* UNIT */}
                <div className="mb-3">
                    <label>Unit of Measure</label>
                    <select
                        className="form-control"
                        name="unit_of_measure"
                        value={formData.unit_of_measure || ""}
                        onChange={handleChange}
                    >
                        <option value="">Select Unit</option>
                        <option value="kg">KG</option>
                        <option value="gram">Gram</option>
                        <option value="liter">Liter</option>
                        <option value="meter">Meter</option>
                    </select>
                    {errors.unit_of_measure && (
                        <p style={{ color: "red" }}>{errors.unit_of_measure}</p>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label"> Category</label>

                    <select
                        className="form-control"
                        name="category_id"
                        value={formData.category_id || ""}
                        onChange={handleChange}
                    >
                        <option value="0">Select Category</option>

                        {products.map((cat) => (
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
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddProduct;