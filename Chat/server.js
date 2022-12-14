const { write } = require("fs");
const net = require("net")
const fs = require("fs")

let counter = 1
let x =1
let clients =[]

let stream = fs.createWriteStream("server.log")

const server = net.createServer((client) => {
    //handle new connection
   if(client){
    
    client.userName ="Guest"+counter
    client.write("Welcome "+client.userName +"\n")
    stream.write("Welcome "+client.userName +"\n")
    clients.push(client)
    console.log(client.userName + " Join the Group\n")
    counter++
    for(let i = 0; i<clients.length; i++){
        if(client.userName === clients[i].userName){
            
        }else{
            clients[i].write(client.userName+ " Joined\n" )
            
        }
     }   
     
     
   }
   client.setEncoding("utf-8")
   client.on("data",data => {
        console.log(client.userName+": "+data)
        stream.write(client.userName+": "+data + "\n" )
        for(let i = 0; i<clients.length; i++){
           if(client.userName === clients[i].userName){

           }else{
                clients[i].write(client.userName+": "+data)

           }
        }           
    })
    client.on("end",data => {
        console.log(client.userName+" Left")
        stream.write(client.userName+" Left\n" )
        for(let i = 0; i<clients.length; i++){
            if(client.userName === clients[i].userName){
            }else{
                 clients[i].write(client.userName+" Left")
            }
         }  
    })
    

}).listen(3112);

console.log("Listening To Port 3112")

