const url = "https://1e44-180-244-132-9.ngrok-free.app/vegetables"
            async function fetchProductList() {
                try {
                    const api = await fetch(url, {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                            "Content-Type": "application/json"
                        }
                    }, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                        
                    });
                    const response = await api.json();

                    const productContainer = document.getElementById("product-list"); 

                    response.data.forEach(product => {
                        const { id, name, description, price, stock, image, address, seller } = product;

                        const productHTML = `
                        <div class="product rounded-xl border border-gray-300 rounded-lg shadow-md p-4 mb-4 flex">
                        <div class="flex flex-col items-center">
                            <img src="${"https://1e44-180-244-132-9.ngrok-free.app"}${image}" alt="" class="product-img mb-2 ">
                        </div>
                        <div class="product-content">
                            <h2 class="product-title text-xl font-bold">${name.length > 15 ? name.slice(0, 24) + '...' : name}</h2>
                            <p class="product-desc">${description.length > 20 ? description.slice(0, 150) + '...more' : description}</p>
                        </div>
                        <div class="product-actions">
                            <div>
                                <h3 class="product-price">Rp.${price}</h3>
                                <p class="text-sm"> Stock ${stock}</p> 
                                <p class="text-s mt-4">⚲ ${address}</p>
                                <h6 class="mt-1 text-center font-bold bg-green-300 p-1 rounded border rounded-xl">${seller} ☑️</h6>
                            </div>
                        </div>
                        <div class="flex mt-8 mb-4 space-x-1.5 self-center">
                            <a href="#!" data-productID="${id}" class="rounded-xl px-9 bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded border border-blue-500">Edit</a>
                            <a href="#!" data-productid="${id}" class="delete-product rounded-xl px-7 hover:bg-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded border border-red-500 hover:border-red-700">Delete</a>
                        </div>
                        </div>
                            `;
                        
                        productContainer.insertAdjacentHTML("beforeend", productHTML);
                    });
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

fetchProductList();

            // Event listener for + ADD button
            document.getElementById("addButton").addEventListener("click", function() {
                // Redirect to another HTML page
                window.location.href = "addVeggies.html";
            });
