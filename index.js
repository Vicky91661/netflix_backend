const express = require("express")
const cors = require('cors');
const app = express();

const PORT = 3003;

const userRoute = require("./routes/userRoutes")
const gptRoute = require("./routes/gptRoutes")

app.use(cors())
app.use(express.json())

app.use("/user",userRoute)
app.use("/gpt",gptRoute)

app.listen(PORT,()=>{
    console.log("listning at ",PORT)
})