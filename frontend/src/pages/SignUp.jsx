import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import backgroundImage from '../assets/3d-render-car-city-wallpaper-preview.jpg'
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      setError(''); // Reset error message

      try {
        await signUp(formData);
        toast.success('Sign-up successful, check your email for the password')
        navigate('/signin');

      } catch (err) {
        setError(err.response.data.message);
        console.error(err,err.response.data.message);
      }
      finally {
        setLoading(false)
      }
    };

    return (
        <>
        <Navbar/>
         <div className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div style={{backgroundColor:"#2E2E2E"}} className="bg-opacity-50 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-6 text-center  text-orange-400">Sign Up</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your Username"
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your Email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your Password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                        />
                    </div>
                    <button className="w-full bg-orange-400 text-white py-2 rounded-lg mt-4" disabled={loading}> {loading ? 'Loading...' : 'Sign Up'}</button>
                </form>
                <div className="mt-4 text-center text-white">
                    If already member? <Link to="/signin" className="text-orange-500">Sign In</Link>
                </div>
            </div>
        </div>
        </>
       
    );
};

export default SignUp;
