import { useState, useEffect } from 'react';

const FruitTable = () => {
    const [fruits, setFruits] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://073e-36-65-255-46.ngrok-free.app/fruits');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFruits(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <tbody className="product">
            {fruits.map((fruit) => (
                <tr key={fruit.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                        <img src={`https://073e-36-65-255-46.ngrok-free.app${fruit.image}`} style={{ width: '64px', height: '64px' }} alt="Product" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {fruit.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {fruit.description}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {fruit.price}
                    </td>
                    <td className="px-6 py-4 gap-4">
                        <button data-productid={fruit.id} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                        <button data-productid={fruit.id} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                    </td>        
                </tr>
            ))}
        </tbody>
    );
};

export default FruitTable;
