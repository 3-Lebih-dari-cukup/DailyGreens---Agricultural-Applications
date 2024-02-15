// SHOW PRODUCTs
const url = "https://1e44-180-244-132-9.ngrok-free.app/fruits";



async function fetchProductList() {
    try {
        const api = await fetch(url, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json"
            }
        });
        const response = await api.json();

        const productContainer = document.getElementById("fruits");

        response.data.forEach(product => {
            const { id, name, description, price, image } = product;

            const productHTML = `
                <tbody class="product">
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td id="image" class="p-4">
                            <img src="https://1e44-180-244-132-9.ngrok-free.app${image}" style="width: 64px; height: 64px;" alt="Product">
                        </td>
                        <td id="name" class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            ${name}
                        </td>
                        <td id="description" class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            ${description}
                        </td>
                        <td id="price" class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            ${price}
                        </td>
                        <td class="px-6 py-4 gap-4">
                            <button id="delete" data-productid="${id}" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                            <button id="edit" data-productid="${id}" type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                        </td>        
                    </tr>
                </tbody>`;

            productContainer.insertAdjacentHTML("beforeend", productHTML);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchProductList();

// Add PRODUCT
document.getElementById("add").addEventListener("click", function() {
    // Redirect to another HTML page
    window.location.href = "addFruit.html";
});

// DELETE PRODUCT
// Temukan semua tombol "Delete"
const deleteButtons = document.querySelectorAll('#delete');

// Iterasi melalui setiap tombol "Delete" dan tambahkan event listener
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Dapatkan id produk dari atribut data-productid
        const productId = this.getAttribute('data-productid');
        
        // Kirim permintaan DELETE ke server untuk menghapus produk
        fetch(`https://1e44-180-244-132-9.ngrok-free.app/fruits/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            this.closest('.product').remove();
            console.log('Product successfully deleted:', data);
        })
        .catch(error => console.error('Error deleting product:', error));
    });
});

// Edit button
const editButtons = document.querySelectorAll('#edit');

// Iterasi melalui setiap tombol "Edit" dan tambahkan event listener
editButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Dapatkan id produk dari atribut data-productid
        const productId = this.getAttribute('data-productid');
        
        // Arahkan pengguna ke halaman edit produk berdasarkan id
        window.location.href = `editFruit.html?id=${id}`;
    });
});

