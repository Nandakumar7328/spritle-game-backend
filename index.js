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
          const checkdata = await Spritle.find()

          const result = checkdata.map(eachData => {
            if(username === eachData.username){
                
                return true
            }else{
                
                return false
            }
          })
          
          if (result === true){
            response.send(false)
            response.status(400)
           
          }else{
            const newData = new Spritle({username,email,password,phonenumber})
            await newData.save()
            response.send(true)
          }
    } 
    catch(err){
        console.log(err.message)
    }
})


app.delete('/delete/:id',async(request,response)=> {
     
    const {id} = request.params 

    try{
       await Spritle.findByIdAndDelete(id)
       response.send("dete successfully!..")
    }
    catch(err){
        console.log(err.message)
    }

})

app.get('/',async(request,response) => {
    
    try{
       const data = await Spritle.find()
       response.send(data)
    } 
    catch(err){
        console.log(err.message)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

