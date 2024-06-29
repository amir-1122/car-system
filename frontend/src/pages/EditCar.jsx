import React, { useState, useEffect } from 'react';
import { updateCar, fetchCars, fetchCategories } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const EditCar = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: '',
    color: '',
    model: '',
    make: '',
    registrationNo: ''
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCar = async () => {
      const { data } = await fetchCars();
      const car = data.find((c) => c._id === id);
      setFormData({
        category: car.category?._id,
        color: car.color,
        model: car.model,
        make: car.make,
        registrationNo: car.registrationNo
      });
    };
    const getCategories = async () => {
      const { data } = await fetchCategories();
      setCategories(data);
    };
    getCar();
    getCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCar(id, formData);
    toast.success('Category Car Successfully')

    navigate('/cars');
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
    <Sidebar/>

    <div className="p-4 xl:ml-80">
      <h1 className="text-2xl font-bold my-4">Edit Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Make"
          value={formData.make}
          onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Registration No"
          value={formData.registrationNo}
          onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Car
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditCar;
