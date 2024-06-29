import React, { useState, useEffect } from 'react';
import { updateCategory, fetchCategories } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../components/Sidebar'
import { toast } from 'react-toastify';

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await fetchCategories();
      const category = data.find((cat) => cat._id === id);
      setName(category.name);
    };
    getCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCategory(id, { name });
    toast.success('Category Edit Successfully')

    navigate('/categories');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
    <SideBar/>

    <div className="p-4 xl:ml-80">
      <h1 className="text-2xl font-bold my-4">Edit Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Category
            </button>
        </form>
        </div>
    </div>
  );
};

export default EditCategory;
