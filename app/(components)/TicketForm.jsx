"use client"

import { useRouter } from 'next/navigation';
import React, {useState} from 'react';
import { BASE_API_URL } from '../utils/contants';

const TicketForm = ({ticket}) => {
    const EDITMODE = ticket._id === "new" ? false : true
    const router = useRouter();

    const startingTicketData = {
        title : "",
        description: "",
        priority : 1,
        progress : 0,
        status: "not started",
        category: "Hardware Problem",
    }

    if(EDITMODE){
      startingTicketData["title"] = ticket.title
      startingTicketData["description"] = ticket.description
      startingTicketData["priority"] = ticket.priority
      startingTicketData["progress"] = ticket.progress
      startingTicketData["status"] = ticket.status
      startingTicketData["category"] = ticket.category
    
    }
    
    const [formData, setFormData]= useState(startingTicketData)

    const handlechange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,

    }))
    }

    const handleSubmit = async (e) => {
       e.preventDefault();


       if(EDITMODE){
        const res = await fetch(`${BASE_API_URL}/api/Tickets/${ticket._id}`, {
          method: "PUT",
          body: JSON.stringify({formData}),
          "content-type" : "application/json"
         })
  
         if(!res.ok){
          throw new Error("Failed to update ticket")
         }
  
   
  
       } else {
        const res = await fetch(`${BASE_API_URL}/api/Tickets`, {
          method: "POST",
          body: JSON.stringify({formData}),
          "content-type" : "application/json"
         })
  
         if(!res.ok){
          throw new Error("Failed to create ticket")
         }
  
        
  
       }
       router.refresh();
      router.push("/")
    }

    const categories = [
      "Hardware Problem",
      "Software Problem",
      "Application Deveopment",
      "Project",
    ];

  return (
    <div className='flex justify-center'>
      <form className='flex flex-col gap-3 w-1/2' method="post" onSubmit={handleSubmit}>
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label> title  </label>
        <input id="title" name="title" type= "text" onChange={handlechange} required={true} value={formData.title}/>

        <label> Description  </label>
        <textarea id="description" name="description" onChange={handlechange} required={true} value={formData.description} rows="5"/>
     
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handlechange}
        >
          {categories?.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
            <input id="priority-1" name = "priority" type="radio" onChange={handlechange} value={1} checked={formData.priority == 1}/><label>1</label>
            <input id="priority-1" name = "priority" type="radio" onChange={handlechange} value={2} checked={formData.priority == 2}/><label>2</label>
            <input id="priority-1" name = "priority" type="radio" onChange={handlechange} value={3} checked={formData.priority == 3}/><label>3</label>
            <input id="priority-1" name = "priority" type="radio" onChange={handlechange} value={4} checked={formData.priority == 4}/><label>4</label>
            <input id="priority-1" name = "priority" type="radio" onChange={handlechange} value={5} checked={formData.priority == 5}/><label>5</label>
        </div>

<label>Progress</label>
<input type="range" id="progress" name="progress" value={formData.progress} min="0" max="100" onChange={handlechange}/>

<label>Status</label>
<select name="status" value={formData.status} onChange={handlechange}>
    <option >Not Started</option>
    <option>Started</option>
    <option>Done</option>

</select>

<input type="submit" className='btn' value={EDITMODE ? "Update Ticket" : "Create Ticket"}/>

       
     
      </form>
    </div>
  )
}

export default TicketForm
