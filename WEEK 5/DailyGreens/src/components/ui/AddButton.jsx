// AddButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export function AddButton() {
    return (
        <div class="fixed bottom-0 left-0 flex flex-col items-end p-4 rounded-l-lg">
            <Link to='/AddVeggies' className=''>
                <button class="mr-4 my-2 px-4 py-2 bg-green-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none hover:bg-green-600" id="addButton">+ ADD</button>
            </Link>
        </div>   
    );
}

