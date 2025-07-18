const mongoose=require("mongoose");

// const connectDatabase=()=>{
  
// mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology: true}).then(
// (data)=>{
//   console.log(`Mongodb connected with server: ${data .connection.host}`);
// }
// ).catch((err)=>{
//   console.log(err);
// })
// }

// const connectDatabase=async ()=>{
// try{
//     const data = await  mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
//     console.log(`Mongodb Mongodb connected with server: ${data .connection.host}`);
// }
// catch(err){
//     console.log(err);
// }
// }   



  
const connectDatabase=async ()=>{
try{
    const data = await  mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,dbName:'Ecommerce'})
    console.log(`Mongodb Mongodb connected with server: ${data.connection.host}`);
}
catch(err){
    console.log(err);  
}
}    

module.exports=connectDatabase;




