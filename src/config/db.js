const mongoose= require("mongoose");

const connectDB= async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoDB connected");
  }
  catch(error){
    console.error("mongoDB connection failed")
    process.exit(1);
  }
}

module.exports = connectDB;