const express = require('express')

const app = express()

const router = require("./routes/userRouter")

app.use("/api/users",router)

app.listen(3000, () => console.log("Server running on port 3000"))