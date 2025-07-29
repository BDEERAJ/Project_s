import mongoose from 'mongoose'
import env from 'dotenv'
env.config()
mongoose.connect(`${process.env.MONGO_URL}`)
export default mongoose;