import React, { useEffect, useState } from 'react';
import { Header } from "../components/ui/Header";
import { AddButton } from "../components/ui/AddButton";

export function VeggiesList() {
    const url = "https://073e-36-65-255-46.ngrok-free.app/vegetables"
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProductList();
    }, []);

    async function fetchProductList() {
        try {
            const response = await fetch(url, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function deleteProduct(id) {
        try {
            const confirmation = window.confirm('Are you sure you want to delete this product?');

            if (confirmation) {
                const response = await fetch(`https://073e-36-65-255-46.ngrok-free.app/vegetables/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Produk telah dihapus');
                    setProducts(products.filter(product => product.id !== id));
                } else {
                    console.log('Gagal menghapus produk');
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    function handleDeleteProduct(id) {
        deleteProduct(id);
    }
    return (
        <>
            <Header></Header>
            <div class="product-list" id="product-list">
                {products.map(product => (
                    <div key={product.id} className="product rounded-xl border border-gray-300 shadow-md p-4 mb-4 flex">
                        <div className="flex flex-col items-center">
                            <img src={`https://073e-36-65-255-46.ngrok-free.app${product.image}`} alt="" className="product-img mb-2" />
                        </div>
                        <div className="product-content">
                            <h2 className="product-title text-xl font-bold">{product.name.length > 15 ? product.name.slice(0, 24) + '...' : product.name}</h2>
                            <p className="product-desc">{product.description.length > 20 ? product.description.slice(0, 150) + '...more' : product.description}</p>
                        </div>
                        <div className="product-actions">
                            <div>
                                <h3 className="product-price">Rp.{product.price}</h3>
                                <p className="text-sm">Stock {product.stock}</p>
                                <p className="text-s mt-4">⚲ {product.address}</p>
                                <h6 className="mt-1 text-center font-bold bg-green-300 p-1 border rounded-xl">{product.seller} ☑️</h6>
                            </div>
                        </div>
                        <div className="flex mt-8 mb-4 space-x-1.5 self-center">
                            <a href={`/UpdateVeggies/${product.id}`} className="editButton rounded-xl px-9 bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 border border-blue-500">Edit</a>
                            <button onClick={() => handleDeleteProduct(product.id)} className="delete-product rounded-xl px-7 hover:bg-red-700 text-red-700 hover:text-white font-bold py-2 border border-red-500 hover:border-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <AddButton></AddButton>
        </>
        
    );
    
}
