
document.addEventListener("DOMContentLoaded", async function(){
    let product = document.querySelector('.product-list'); 
    
    async function deleteProduct(id){
        try {
            let confirmation = window.confirm('Are you sure you want to delete this product?');

            if (confirmation){
                let response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Produk telah dihapus');
                    document.querySelector('[data-productid="${id}"]').closest('.product').remove();
                } else {
                    console.log('Gagal menghapus produk');
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    }           

// listener delete button
product.addEventListener('click', async function(event) {
    if (event.target.classList.contains('delete-product')) {
        let productId = event.target.dataset.productid;
        await deleteProduct(productId);
        event.target.closest('.product').remove();
    }
});

async function fetchProductList(url) {
    try {
        let data = await fetch(url, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json"
            }
        });
        let response = await data.json();

        for (let i = 0; i < response.length; i++) {
            let description = response[i].data[i].description;
            let title = response[i].data[i].title;
            product.innerHTML += `
                <div class="product rounded-xl border border-gray-300 rounded-lg shadow-md p-4 mb-4 flex">
                    <div class="flex flex-col items-center">
                        <img src="${response[i].data[i].image}" alt="" class="product-img mb-2 ">
                    </div>
                    <div class="product-content">
                        <h2 class="product-title text-lg font-bold">${title.length > 15 ? title.slice(0, 24) + '...' : title}</h2>
                        <p class="product-desc">${description.length > 20 ? description.slice(0, 150) + '...more' : description}</p>
                    </div>
                    <div class="product-actions">
                        <div>
                            <h3 class="product-price">${response[i].data[i].price}$</h3>
                            <p class="text-sm"> Stock 23</p> 
                            <p class="text-s mt-4">⚲ Bojongsoang</p>
                            <h6 class="mt-1 text-center font-bold bg-green-300 p-1 rounded border rounded-xl">SiHijau ☑️</h6>
                        </div>
                    </div>
                    <div class="flex mt-8 mb-4 space-x-1.5 self-center">
                        <a href="#!" data-productID="${response[i].data[i].id}" class="rounded-xl px-9 bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded border border-blue-500">Edit</a>
                        <a href="#!" data-productid="${response[i].data[i].id}" class="delete-product rounded-xl px-7 hover:bg-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded border border-red-500 hover:border-red-700">Delete</a>
                    </div>
                </div>
                `;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



    fetchProductList('https://1e44-180-244-132-9.ngrok-free.app/vegetables', {
        headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json"
        },
        })
});