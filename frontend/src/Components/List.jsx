import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../Components/ui/table";
import { Button } from "../Components/ui/button";
 
import Header from "./Header";

export default function Component() {
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    task: "",
    position: ""
  });
  const toggleAccountDropdown = () => {
    setAccountDropdown(!accountDropdown);
};

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5124/api/Employee');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const delet = async (id) => {
    try {
      await axios.delete(`http://localhost:5124/api/Employee/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (user) => {
    setEditData(user);
    setFormData(user);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5124/api/Employee/${formData.id}`, formData);
      fetchData();
      setEditData(null);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };
  const handleSortChange = (param) => {
     let sortedData = [...userData];
    if (param === 'email') {
      sortedData.sort((a, b) => a.email.localeCompare(b.email));
    } else if (param === 'name') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
  
     setUserData(sortedData);
  };
  
   
 
  return (<>
    <Header></Header>
    
    <div className="border rounded-lg mt-16 w-full text-black h-screen relative">
     
      <div className="absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="relative flex items-center  mx-4">
                <button className="   justify-center  items-center px-4 py-2 h-16  text-base font-medium rounded-md text-white bg-gray-600 mt-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" id="options-menu" aria-expanded="true" aria-haspopup="true" onClick={() => toggleAccountDropdown()}>
                    Sort By
               </button>
                     {accountDropdown && <div className="  flex  gap-2  p-2 items-center mt-5"  >
                        <button onClick={() => handleSortChange('email')} className="block px-4  py-2 mb-2 border-2 border-black  rounded-xl text-sm w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900"  >email</button>
                        <button onClick={() => handleSortChange('name')} className="block border-2 mb-2 border-black px-4 py-2  rounded-xl text-sm w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900" >name</button>
                      </div>}
            </div>
      <div className="border-2 m-5 border-black rounded-xl relative z-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData && userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.task}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
               {user.completed ? <Button color="red" className="bg-green-600 mx-5" size="sm" variant="outline" >
               completed
                  </Button>:
                  <Button color="red" className="bg-red-600 mx-5" size="sm" variant="outline"  >
                    requesting
                  </Button>}
                  <Button className="mr-2" size="sm" variant="outline" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button color="red" size="sm" variant="outline" onClick={() => delet(user.id)}>
                    Delete
                  </Button>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {editData && (
        <div className="absolute border-2 border-black shadow-2xl w-[60%] flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-8 rounded-2xl">
          <input type="hidden" id="id" name="id" className="border-2 border-black rounded-xl"  value={formData.id} onChange={handleInputChange} />
          <div className="p-5">
            <label className="text-center" htmlFor="name">Name:</label>
            <input type="text" className="w-full p-3 border-2 border-black rounded-xl" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="p-5">
            <label className="text-center" htmlFor="position">Position:</label>
            <input type="text" className="w-full p-3 border-2 border-black rounded-xl" id="position" name="position" value={formData.position} onChange={handleInputChange} />
          </div>
          <div className="p-5">
            <label className="text-center" htmlFor="task">Task:</label>
            <input type="text" className="w-full p-3 border-2 border-black rounded-xl" id="task" name="task" value={formData.task} onChange={handleInputChange} />
          </div>
          <div className="p-5">
            <label className="text-center" htmlFor="email">Email:</label>
            <input type="email" className="w-full p-3 border-2 border-black rounded-xl" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
           
          <div className="flex justify-evenly mt-4">
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
    </>);
}
