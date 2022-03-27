//@ts-nocheck
import express from 'express'
import cors from 'cors'
import connectToMongoDB from './utils/connectToMongoDB'
import createListRouter from './routes/list.routes'
import createItemRouter from './routes/item.routes'
import User from './models/User'
import * as errors from './errors'
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello from express-tsp api!!' })
})

app.use('/api/users', createListRouter('users', { default: User }))
app.use('/api/user', createItemRouter(
    'user',
    { default: User },
    {
        '/user_delete': [authMiddlewares.requiresAdminAuth]
    }
))

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 404
    const errorMessage = errors.transformErrorMessage(error) || 'Something went wrong.';
    res.status(statusCode).json({
        status: 'error',
        message: errorMessage,
        stack: error.stack
    })
})

app.listen(5000, (error: Error) => {
    if (error) { return console.log(`Error: `, error) }
    console.log(`Listening on port 5000`)
    connectToMongoDB()
})