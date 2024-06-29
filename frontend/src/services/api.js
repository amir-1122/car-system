import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use(req => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const getTotalUsers = () => API.get('/users/totalUser');
export const fetchCategories = () => API.get('/categories');
export const createCategory = (newCategory) => API.post('/categories', newCategory);
export const updateCategory = (id, updatedCategory) => API.put(`/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
export const fetchCars = () => API.get('/cars');
export const createCar = (newCar) => API.post('/cars', newCar);
export const updateCar = (id, updatedCar) => API.put(`/cars/${id}`, updatedCar);
export const deleteCar = (id) => API.delete(`/cars/${id}`);
