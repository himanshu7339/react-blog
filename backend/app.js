const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
app.use(express.json());
// cookieParser middleware
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
//connect database
connectDB();

// import routers
const user = require("./routes/userRoute");
const category = require("./routes/categoryRoute");
const post = require("./routes/postRoute");
app.use("/api/v1/", user);
app.use("/api/v1/", category);
app.use("/api/v1/", post);
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
