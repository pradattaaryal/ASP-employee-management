import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../Components/ui/table";
import { Button } from "../Components/ui/button";
import NHeader from "./NormalH";

export default function Normal() {
  const [userData, setUserData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const modalRef = useRef();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5124/api/Employee');
      const storedEmail = localStorage.getItem('data');
      const filteredData = response.data.filter(user => user.email === storedEmail);
      setUserData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5124/api/Employee/${id}/toggle-completed`);
      fetchData(); // Refresh data after toggle
    } catch (error) {
      console.error('Error toggling completed state:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // Add event listener to detect clicks outside modal
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRowClick = (user) => {
    setSelectedRow(user);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <>
      <NHeader/>
      <div className="border rounded-lg mt-16 w-full text-black h-screen relative">
        <div className="absolute top-0 left-0 w-full h-full z-0"></div>
        <div className="border-2 m-5 border-black rounded-xl relative z-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right mr-5">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData && userData.map((user, index) => (
                <TableRow className=" " key={index} onClick={() => handleRowClick(user)}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>{user.task}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      color="red"
                      className={user.completed ? "bg-green-600 mx-5" : "bg-red-600 mx-5"}
                      size="sm"
                      variant="outline"
                      onClick={() => toggleCompleted(user.id)}>
                      {user.completed ? "completed" : "requesting"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedRow && (
        <div className="fixed top-0 left-0 h-full w-full  flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div ref={modalRef} className="bg-white min-w-[60%]   p-8 rounded-lg">
            <button className="absolute top-0 right-0 m-4" onClick={closeModal}>Close</button>
            <p className="py-2 px-5 border-black border-2 rounded-xl m-5">Name: {selectedRow.name}</p>
            <p className="py-2 px-5 border-black border-2 rounded-xl m-5">Role: {selectedRow.position}</p>
            <p className="py-2 px-5 border-black border-2 rounded-xl m-5 ">Task: {selectedRow.task}</p>
            <p className="py-2 px-5 border-black border-2 rounded-xl m-5">Email: {selectedRow.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
