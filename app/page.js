import React from 'react'
import TicketCard from './(components)/TicketCard';
import { BASE_API_URL } from './utils/contants';

const getTickets = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/Tickets`, {
      cache: "no-store"
    })



    if(!res.ok){
      throw new Error("Failer to fetch ticket")
    }
    return res.json()
  } catch (error) {
    console.log("Failer to get ticket", error)    
  }
}

const Dashboard = async () => {

  const data = await getTickets();

if(!data?.tickets){
return <p>No tickets!!!</p>
}

const tickets = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({category}) => category))
  ]
  return (
    <div className='p-5'>
      <div>
{tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) =>  (
  <div key={categoryIndex} className="md-4">
    <h2>{uniqueCategory}</h2>
    <div className='lg:grid grid-cols-2 xl:grid-cols-4'>
      {tickets.filter((ticket) => ticket.category === uniqueCategory).map((filteredTicket, _index) => (
        <TicketCard id={_index} key ={_index} ticket={filteredTicket}/>
      ))}
</div>

    </div>
))}
      </div>
    
    </div>
  )
}

export default Dashboard
