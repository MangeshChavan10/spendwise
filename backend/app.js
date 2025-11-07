const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes")
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/subscription",subscriptionRoutes)

async function connectDB(){
   const connected =  await mongoose.connect(process.env.MONGODB_URL);
   if(connected){
    console.log("Connected to the DB")
   }
    app.listen(3000);
}
connectDB();
