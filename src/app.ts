import express from 'express'
import { initializeAPI } from './api'

const port = 3000
const app = express ()

app.use(express.json())

initializeAPI(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





