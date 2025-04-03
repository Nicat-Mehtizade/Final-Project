const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express()
const connectDB=require("./config/db")

connectDB()

dotenv.config()

app.use(cors())
app.use(express.json())



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })