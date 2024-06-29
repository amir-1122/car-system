import React, { useState } from 'react';
import { createCategory } from '../services/api';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/Sidebar'
import { toast } from 'react-toastify';

const AddCategory = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name });
    toast.success('Category added successfully')

    navigate('/categories');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
        <SideBar/>

        <div className="p-4 xl:ml-80">
        <h1 className="text-2xl font-bold my-4">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Category
            </button>
        </form>
        </div>
    </div>
  );
};

export default AddCategory;
