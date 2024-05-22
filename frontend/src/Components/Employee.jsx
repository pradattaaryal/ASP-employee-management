import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../Components/ui/table";
import { Button } from "../Components/ui/button";
 
import Header from "./Header";

export default function Employee() {
  const [userData, setUserData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    task: "",
    position: ""
  });

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5124/api/User');
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

  const link=()=>{
    window.location.replace('/create');
  }

  return (<>
    <Header></Header>
    <div className="border rounded-lg mt-16 w-full text-black h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full z-0"></div>
       
      <div className="border-2 m-5 border-black rounded-xl relative z-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
               
               
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData && userData.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                
                 
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
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
          <input type="hidden" id="id" name="id" value={formData.id} onChange={handleInputChange} />
          <div className="p-5">
            <label className="text-center" htmlFor="name">Name:</label>
            <input type="text" className="w-full p-3" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="p-5">
            <label className="text-center" htmlFor="position">Position:</label>
            <input type="text" className="w-full p-3" id="position" name="position" value={formData.position} onChange={handleInputChange} />
          </div>
          <div className="p-5">
            <label className="text-center" htmlFor="task">Task:</label>
            <input type="text" className="w-full p-3" id="task" name="task" value={formData.task} onChange={handleInputChange} />
          </div>
          <div className="p-5">
            <label className="text-center" htmlFor="email">Email:</label>
            <input type="email" className="w-full p-3" id="email" name="email" value={formData.email} onChange={handleInputChange} />
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
