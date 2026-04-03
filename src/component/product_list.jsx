import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}product_details/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.log(error));

    }, [BASE_URL]);

    
  // DELETE FUNCTION
  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {

      const response = await fetch(`${BASE_URL}product_details/delete/${id}`, {
        method: "DELETE",
        headers: {
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + sessionStorage.getItem("adminToken")
        }

      });

      if (response.ok) {

        // UI se remove kar denge
        setProducts(products.filter(product => product.id !== id));

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

                <h3>Product  List</h3>

                <Link to="/add_products" className="btn btn-primary">
                    Add Product
                </Link>

            </div>

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>short Desciption</th>
                        <th>Description</th>
                        <th>SKU Code</th>
                        <th>Sale Price</th>
                        <th>Cost Price</th>
                        <th>MRP</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((product) => (
                        
                        <tr key={products.id}>

                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.short_description}</td>
                            <td>{product.description}</td>
                            <td>{product.sku_code}</td>
                            <td>{product.sale_price}</td>
                            <td>{product.cost_price}</td>
                            <td>{product.qty}</td>
                            <td>{product.mrp}</td>
                            <td>{product.is_active ? "Yes" : "No"}</td>

                            <td>
                                <Link to={`/edit_product/${product.id}`} className="btn btn-warning btn-sm">
                                    Edit
                                </Link>

                                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
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
export default ProductList;