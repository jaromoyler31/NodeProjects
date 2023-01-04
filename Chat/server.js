const { write } = require("fs");
const net = require("net")
const fs = require("fs");
const { runInContext } = require("vm");
const password = "Mangos4Me"

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
        if(data.includes("/w ")){
        
        }else if(data.includes("/kick")){
            const words = data.split(' ');
            if(words[2].trim() === password){
                for(let m = 0; m< clients.length; m++){
                    let c = clients[m].userName
                    if(words[1].trim() === clients[m].userName){
                        for(let q = 0; q<clients.length; q++){
                            if(words[1].trim() === clients[q].userName){
                                clients[q].write("You Have Been Kicked")
                            }
                        }
                        clients[m].destroy()
                        clients.filter(client => (client.userName !== c))
                        return
                    }
                }
            }else{
                client.write("Wrong Password")
                return
            }
        }else if(data.includes("/clientlist")){
            client.write("All of The Users On Are:")
            for(let n = 0; n<clients.length ; n++){
                client.write(clients[n].userName+"\n")
            }
            return
        }else if(data.includes("/username")){
            const oldname = client.userName
            const words = data.split(' ');
            for(let x = 0; x<clients.length; x++){
                if(client.userName === clients[x].userName ){
                    clients[x].userName = words[1].trim()
                    console.log(oldname + " Changed His Name to "+ clients[x].userName)
                    stream.write(oldname + " Changed His Name to "+ clients[x].userName+"\n")
                    for(let i = 0; i<clients.length; i++){
                        if(client.userName === clients[i].userName){

                        }else{
                            clients[i].write(oldname + " Changed His Name to "+ clients[x].userName)
                        }
                    }
                    return
                }
            
            }
        }else{
            console.log(client.userName+": "+data)
        }
        for(let i = 0; i<clients.length; i++){

            if(data.includes("/w "+clients[i].userName)){
                let num = i
                
                const words = data.split(' ');

                let message = ""
                for(let y = 2 ; y<words.length; y++){
                    message = message + words[y] + " "
                }

                console.log(client.userName+" Whispering to "+clients[i].userName+": " + message )
                stream.write(client.userName+" Whispered: " + message )
                clients[num].write(client.userName+" Whispered: " + message)
                
            }
            else if(data.includes("/w ")){
                
            }
            else{
                if(client.userName === clients[i].userName){

                }else{
                    clients[i].write(client.userName+": "+data)
                    stream.write(client.userName+": "+data)

                }
            }
            
        }           
    })


    client.on("end",data => {
        console.log(client.userName+" Left")
        stream.write(client.userName+" Left\n" )
        for(let i = 0; i<clients.length; i++){
            if(client.userName === clients[i].userName){
                clients.splice(i,1)
            }else{
                clients[i].write(client.userName+" Left")
            }
         }  
    })
    

}).listen(3112);

console.log("Listening To Port 3112")

