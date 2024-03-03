import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

export function UpdateVeggies() {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        if (id) {
            fetch(`https://073e-36-65-255-46.ngrok-free.app/vegetables/${id}`, {
                method: 'GET',
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response && response.data) {
                    setData(response.data);
                } else {
                    console.error('Invalid response format');
                }
            });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (id) {
            fetch(`https://073e-36-65-255-46.ngrok-free.app/vegetables/${id}`, {
                method: 'PUT',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data successfully sent:', data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
    };

    return (
        <section className="wrapper">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-12 rounded bg-gray-900 ">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Edit Veggies</h2>
                <form id="AddForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Veggies Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={data.name} onChange={handleChange} placeholder="Type product name" required=""/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={data.address} onChange={handleChange} placeholder="Seller Address" required=""/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (Rupiah)</label>
                            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={data.price} onChange={handleChange} placeholder="Rp. 000" required=""/>
                        </div>
                        <div>
                            <label htmlFor="seller" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seller</label>
                            <input type="text" name="seller" id="seller" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={data.seller} onChange={handleChange} placeholder="Seller Store Name" required=""/>
                        </div>
                        <div>
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                            <input type="number" name="stock" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-primary-500" value={data.stock} onChange={handleChange} placeholder="Ex. 12" required=""/>
                        </div> 
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description" id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a product description here..." value={data.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Photo</label>
                            <img id="imageInput" className="w-14" alt="Product Image"/> 
                            <input className="pl-3 py-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="image" id="image" type="file" name="image"/>
                        </div>                    
                    </div>                
                    <div className="flex items-center space-x-4 mt-8 justify-end ">
                        <Link to='/'>
                            <button id="backButton" type="button" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-blue-800">
                                ⬅️Back
                            </button>
                        </Link>
                        <button id="saveButton" type="submit" className="disabled:bg-gray-400 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled-button"> 
                            Save Veggies
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default UpdateVeggies;
