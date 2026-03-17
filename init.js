const Chat = require("./models/chats.js");
const mongoose = require("mongoose");


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("connection successful");
    
}

main().then(()=>{console.log("connection successful ")}).catch(err => console.log(err));
let allChats = [
  {
    from: "Liza",
    to: "Sushmita",
    msg: "Hey! Did you finish the assignment?",
    created_at: new Date(),
  },
  {
    from: "Sushmita",
    to: "Liza",
    msg: "Almost done. Just checking the last question.",
    created_at: new Date(),
  },
  {
    from: "Rahul",
    to: "Liza",
    msg: "Are we meeting for group study today?",
    created_at: new Date(),
  },
  {
    from: "Liza",
    to: "Falton",
    msg: "Yes, let's meet at the library at 5.",
    created_at: new Date(),
  },
  {
    from: "Ananya",
    to: "Sushmita",
    msg: "Can you send me the class notes?",
    created_at: new Date(),
  },
  {
    from: "Sushmita",
    to: "Ananya",
    msg: "Sure! I'll send them in a minute.",
    created_at: new Date(),
  },
  {
    from: "Sushmita",
    to: "Ananya",
    msg: "Hey! Can we discuss about the thermodynamics fluid dynamics topic that sir was discussing in the class ? If you could help me understand it .",
    created_at: new Date(),
  },
  {
    from: "Ananya",
    to: "Sushmita",
    msg: "Ok, I'll tell you when I'm free.",
    created_at: new Date(),
  },
  {
    from : "Liza",
    to : "Sushmita",
    msg: "Hello,can we meet now?",
    created_at : new Date(),
  }
];

Chat.insertMany(allChats);
console.log("Sample chats inserted");
