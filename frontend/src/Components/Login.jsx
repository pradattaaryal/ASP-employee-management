import { useState } from 'react';
import axios from 'axios';
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
 
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:5124/api/User/login', formData);
      console.log(response.data); 
      
      if(response.data.role=="Admin")
     { window.location.replace('/Home');}
      else{
        localStorage.setItem('data', response.data.email);

        navigate('/normal');
      } 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md  border-2 border-black rounded-xl shadow-2xl  p-5 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight underline text-fuchsia-600 dark:text-gray-50">
            Login
          </h2>
        </div>
        <div className=" border-2 border-black rounded-xl bg-white px-4 py-8 shadow dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor="email">
                Email address
              </Label>
              <Input
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                id="email"
                name="email"
                placeholder="Email address"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                autoComplete="current-password"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <p>dont have an account <Link className=' text-purple-700 py-2 ' to="/"> create</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
