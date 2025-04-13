import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import adminRouter from './routes/adminRoute.js'



dotenv.config();
connectDB()

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)



app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})