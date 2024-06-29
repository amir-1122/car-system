import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from '../services/api';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/Sidebar'
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    await deleteCategory(id);
    setCategories(categories.filter((category) => category._id !== id));
    toast.success('Category removed Successfully')

    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      name: 'Category Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => navigate(`/edit-category/${row._id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              setSelectedCategory(row);
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
   <>
   <div className="min-h-screen bg-gray-50/50">
        <SideBar/>
        <div className="p-4 xl:ml-80">
        <h1 className="text-2xl font-bold my-4">Categories</h1>
        <Link to="/add-category" className="bg-blue-500 text-white px-4 py-2 rounded my-4 inline-block float-right">
            Add Category
        </Link>
        <DataTable
            columns={columns}
            data={categories}
            progressPending={loading}
            pagination
            selectableRows
        />
        {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Delete Category</h2>
                <p>Are you sure you want to delete {selectedCategory.name}?</p>
                <div className="flex space-x-4 mt-4">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(selectedCategory._id)}
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
    </>
  );
};

export default Categories;
