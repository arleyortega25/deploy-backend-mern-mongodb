import mongoose from "mongoose";
import { MONGODB_PASSWORD } from './config.js'
const ConectMDB = async () => {
  try {
   await  mongoose.connect(MONGODB_PASSWORD);
   console.log('base de datos conectada')
  } catch (error) {
    console.error(error)
  }
};
export default ConectMDB
