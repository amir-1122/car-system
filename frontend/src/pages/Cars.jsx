import React, { useState, useEffect } from 'react';
import { fetchCars, deleteCar } from '../services/api';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCars = async () => {
      const { data } = await fetchCars();
      setCars(data);
      setLoading(false);
    };
    getCars();
  }, []);
console.log(cars,'cars');
  const handleDelete = async (id) => {
    await deleteCar(id);
    setCars(cars.filter((car) => car._id !== id));
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      name: 'Category',
      selector: (row) => row?.category?.name,
      sortable: true,
    },
    {
      name: 'Color',
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: 'Model',
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: 'Make',
      selector: (row) => row.make,
      sortable: true,
    },
    {
      name: 'Registration No',
      selector: (row) => row.registrationNo,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => navigate(`/edit-car/${row._id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              setSelectedCar(row);
              setIsDeleteModalOpen(true);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
        <Sidebar/>
        <div className="p-4 xl:ml-80">
      <h1 className="text-2xl font-bold my-4">Cars</h1>
      <Link to="/add-car" className="bg-blue-500 text-white px-4 py-2 rounded my-4 inline-block float-right">
        Add Car
      </Link>
      <DataTable
        columns={columns}
        data={cars}
        progressPending={loading}
        pagination
        selectableRows
      />
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Car</h2>
            <p>Are you sure you want to delete {selectedCar.model}?</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(selectedCar._id)}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Cars;
