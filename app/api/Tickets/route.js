import { Ticket } from "../../(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req){
    console.log("POST RUN", req)
    try {
     
        const tickets = await Ticket.find()
        console.log("tickets", tickets)
            

            return NextResponse.json({tickets}, {status : 200});
      
    } catch (error) {
        return NextResponse.json({message : "Error", error: {error}}, {status: 500})
    }
}


export async function POST(req){
    console.log("POST RUN", req)
    try {
        const body = await req.json()
        const ticketData = body.formData
            await Ticket.create(ticketData)

            return NextResponse.json({message : "Ticket Created"}, {status : 201});
      
    } catch (error) {
        return NextResponse.json({message : "Error", error: {error}}, {status: 500})
    }
}



