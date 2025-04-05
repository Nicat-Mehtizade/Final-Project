const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config()

function connectDB(){
    const db=process.env.DB.replace("<password>", process.env.PASSWORD)
    mongoose.connect(db)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((error)=>console.log(error))
}

module.exports=connectDB