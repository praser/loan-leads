import dotenv from "dotenv-safe"
dotenv.config()

import express from "express"
import leadsRouter from "./routers/leads"

const app = express()
const port = 3000

app.use(express.json())
app.use("/leads", leadsRouter)

app.listen(port, () => {
  console.log(`Api is listening on port ${port}`)
})
