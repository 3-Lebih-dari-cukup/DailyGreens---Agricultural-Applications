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
                            <button id="delete" data-id="${id}" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
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
let link = "https://1e44-180-244-132-9.ngrok-free.app/fruits";
let options = {
    method: "DELETE"
}

fetch(link, options)
.then(response => console.log(response.status))