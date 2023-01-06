
const express = require("express")
const path = require("path")

const app = express()
app.set("views", "./views")
app.use(express.static("./views"))
app.set("view engine", "pug")

app.use(express.urlencoded({extended: false}))// important

let y 
let update = false
let employ =  [
    {username: "BobRoss",name:"Bob Ross", age:52, email: "bobross@gmail.com", address: "442 painting Road "},
    {username: "McDuck", name: "Scruge McDuck", age: 154, email: "McDuck@mcduckenterprise.gold", address:"Duckburg, Calisota, United States"},
    {username: "DarthVader", name: "Anan Skywalker", age: 45, email: "Darthvader@sith4Me", address:"Death Star 154 Floor Room 112"},
    {username: "ToothLess", name: " Hiccup Horrendous Haddock III", age: 15, email: "Dragon4Me@Gmail.com", address:"Berk"},

]

app.get("/", (req, res)=> {
    res.render("index")
})

app.post("/", (req, res)=> {
    if(update === true){
        employ[y].username = req.body.username
        employ[y].name = req.body.name
        employ[y].age = req.body.age
        employ[y].email = req.body.email
        employ[y].address = req.body.address
        update = false
    }

    res.render("index")
})

app.post("/login", (req, res)=> {
    employ.push({
        username: req.body.username,
        name: req.body.name ,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address ,
    })
    res.render("table", {
        user: employ
    })
})

app.get("/login", (req, res)=> {
    res.render("table", {
        user: employ
    })
})

app.get("/editUser/:username", (req, res) =>{
    for(let x = 0; x< employ.length; x++){
        if(employ[x].username === req.params.username){
            res.render("editUser", {
                user: employ[x]
            })
            y=x
            update = true
            return
        }
    }
    
})

app.get("/delete/:username", (req,res)=>{
    for(let x = 0; x<employ.length; x++){
        if(employ[x].username === req.params.username){
            employ.splice(x,1)
        }
    }
    res.render("table", {
        user: employ
    })
})

app.listen(3001, ()=> {
    console.log("listening on port 3001")
})

