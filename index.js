const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Spritle = require("./model")
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://NandaKumar:Nanda7328@cluster0.9j7nchf.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log("DB Connected .....!")
).catch(err => console.log(err,"DB"))

const port = process.env.PORT || 3000

app.post('/adduser',async(request,response) => {
    const {username,email,password,phonenumber} = request.body
    try{
       const newData = new Spritle({username,email,password,phonenumber})
       await newData.save()
       return response.json(await Spritle.find())
    } 
    catch(err){
        console.log(err.message)
    }
})

app.get('/',async(request,response) => {
    
    try{
       return response.json(await Spritle.find())
    } 
    catch(err){
        console.log(err.message)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

