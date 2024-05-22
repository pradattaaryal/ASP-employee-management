import { useState } from 'react';
import axios from 'axios';
import { Label } from "../Components/ui/label"
import { Input } from "../Components/ui/input"
import { Button } from "../Components/ui/button"
import { Link } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5124/api/User/register', formData);
      console.log(response.data); 
      window.location.replace('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex min-h-screen  items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full border-2 border-black rounded-xl shadow-2xl p-5 max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight underline text-fuchsia-600 dark:text-gray-50">
            SignIn
          </h2>
        </div>
        <div className="  border-2 border-black rounded-xl bg-white px-4 py-8 shadow dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                autoComplete="name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                id="name"
                name="name"
                placeholder="Name"
                required
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
              Sign in
            </Button>
            <p>already lave an account<Link className='px-2 text-purple-700 ' to="/login">login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
