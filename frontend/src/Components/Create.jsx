import { useState } from "react";
import axios from "axios";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CardContent, CardFooter, Card } from "./ui/card";
import { Button } from "./ui/button";
import Header from "./Header";

export default function Create() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    task: "",
    position: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5124/api/Employee", formData)
      .then((response) => {
         
        console.log("Todo created successfully:", response.data);
         
      })
      .catch((error) => {
        
        console.error("Error creating todo:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-20 max-w-md space-y-6 border-2 border-black p-5 rounded-3xl shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create a New Todo</h1>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form to add a new task to your todo list.</p>
        </div>
        <Card>
          <CardContent className="space-y-4 border-2 border-black  rounded-xl ">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" className="border-2 border-black"  placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input className="border-2 border-black" id="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task">Task</Label>
                <Textarea  className="min-h-[100px] border-2 border-black" id="task" placeholder="Enter your task" value={formData.task} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" className="border-2 border-black"  placeholder="Enter the position" value={formData.position} onChange={handleChange} />
              </div>
              <CardFooter className="flex justify-center">
                <Button type="submit" className="mt-2">Create Todo</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
