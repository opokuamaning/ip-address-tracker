const express = require("express");
const AppRouter = require("./Routes/AppRoutes");
const app = express();
const cors = require("cors")

app.use(cors());

app.use(express.json())
app.use("/", AppRouter);
PORT = 3080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})