import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Categories from './pages/Categories';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import Cars from './pages/Cars';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  return (
    <>
      <AuthProvider>
      <Router>
      <ToastContainer 
          position='top-center'
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/categories" element={<ProtectedRoute component={Categories} />} />
          <Route path="/add-category" element={<ProtectedRoute component={AddCategory} />} />
          <Route path="/edit-category/:id" element={<ProtectedRoute component={EditCategory} />} />
          <Route path="/cars" element={<ProtectedRoute component={Cars} />} />
          <Route path="/add-car" element={<ProtectedRoute component={AddCar} />} />
          <Route path="/edit-car/:id" element={<ProtectedRoute component={EditCar} />} />
          <Route path="/cars" element={<Cars />} />

        </Routes>
      </Router>
    </AuthProvider>
        
   </>
  
    
  );
};

export default App;
