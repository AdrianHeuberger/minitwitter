import express from 'express'
import { initializeAPI } from './api'
import cors from 'cors'
import { initializeMessageBroker } from './message-broker'

const SERVER_ROLE = process.env.SERVER_ROLE || 'all'
const allowedServerRoles = ['all', 'api', 'worker']
if (!allowedServerRoles.includes(SERVER_ROLE)) {
  console.error(`Invalid SERVER_ROLE: ${SERVER_ROLE}`)
  process.exit(1)
}

// For the worker server & api queue
initializeMessageBroker()

// For the API server
if (SERVER_ROLE === 'all' || SERVER_ROLE === 'api') {
  const port = 3000

  const app = express()
  app.use(express.json())
  app.use(cors())
  initializeAPI(app)

  app.listen(port, () => {
    console.log(`MiniTwitter listening on port ${port}`)
  })
}