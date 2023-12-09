import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise


const TicketSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status : String,
    active: Boolean,
}, {timestamps : true})


export const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);