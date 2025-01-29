import express from 'express'
import { initializeAPI } from './api'
import cors from 'cors'

const port = 3000
const app = express ()

app.use(express.json())
app.use(cors())

initializeAPI(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





