const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const methodOverride = require('method-override')

//Routes
const userRouter = require("./routes/userRouter")
const sessionRouter = require("./routes/sessionRouter")
const appRouter = require("./routes/appRouter")
const categoryRouter = require("./routes/categoryRouter")

const app = express()

//Middlewares
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'session',
  keys: ["3jh2czc79afa", "o0zvgk1rvz6xc"],
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(methodOverride("_method"))

app.use("/api/users", userRouter)
app.use("/api/sessions", sessionRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/apps", appRouter)
// app.use("/api/buy", saleRouter)

app.listen(3000, () => console.log("Server running on port 3000"))