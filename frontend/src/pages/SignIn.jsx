import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../services/api';
import { setToken } from '../utils/auth';
import { AuthContext } from '../context/AuthContext';
import backgroundImage from '../assets/3d-render-car-city-wallpaper-preview.jpg'
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        try {
          const { data } = await signIn(formData);
          login(data);
          toast.success('Login Successfully')
          navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
            console.error(err);
        }
        finally{
            setLoading(false)
        }
      };

    return (
        <>
          <Navbar/>
          <div className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
              
            <div style={{backgroundColor:"#2E2E2E"}} className="bg-opacity-50 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-6 text-center  text-orange-400">Sign In</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white mb-2" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            placeholder="Enter your Email"
                            // value={email}
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
                            // value={password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button className="w-full bg-orange-400 text-white py-2 rounded-lg mt-4" disabled={loading}>{loading?'Loading...':'Sign In'}</button>
                </form>
                <div className="mt-4 text-center text-white">
                    Now a mamber? <Link to="/signup" className="text-orange-500">Sign Up</Link>
                </div>
            </div>
           
        </div>
          </>
       
    );
};

export default SignIn;
