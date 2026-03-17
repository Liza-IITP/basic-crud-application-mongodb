const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")))  ;
app.use(express.urlencoded({extended :true})) ; 
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

main().then(()=>{console.log("connection successful");}).catch(err => console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
app.get("/", (req, res) => {
    res.send("working fine");
});
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find() ; 
    res.render("index.ejs",{chat:chats}) ; 
});
app.get("/chats/new",async(req,res)=>{
    res.render("new.ejs") ; 

});
app.post("/chats",(req,res)=>{
    let {from , to , msg} = req.body ; 
    let new_chat = new Chat({from:from , to:to,msg:msg,created_at:new Date()});
    new_chat.save() ;
    res.redirect("/chats") ;  
});
app.get("/chats/:id/edit", async (req,res)=>{
    let { id } = req.params;
    let required_chat = await Chat.findById(id);
    res.render("edit.ejs",{required_chat});
});
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    let chat = await Chat.findByIdAndUpdate(id,{
        msg : msg,
        created_at: new Date()
    },{runValidators : true , returnDocument: "after" });
    
    res.redirect("/chats");
});
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;

    let deleted = await Chat.findByIdAndDelete(id);
    console.log(deleted) ; 
    res.redirect("/chats");
});
app.listen(8080, () => {
    console.log("server running on port 8080");
});