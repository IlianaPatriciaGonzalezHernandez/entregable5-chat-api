//Dependencies
const express = require('express')
const cors = require('cors')

//files
const config = require('../config')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const conversationRouter = require('./conversations/conversations.router')

//iNITIAL CONFINGS
const app = express()
//enable incoming JSON data
app.use(express.json())
//enable CORS
app.use(cors())

//Authenticate DB
db.authenticate()
    .then(() => console.log('Database Authenticaded'))
    .catch((err) => console.log(err))

//Sync Database Models
db.sync()
    .then(() => console.log('Database Synced'))
    .catch((err) => console.log(err))

//Initialize my models relations
initModels()

//Routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'OK!',
        routes: {
            users: ""
        }
    })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/conversations', conversationRouter)

app.listen(config.api.port, () => {
    console.log(`Server started on ${config.api.host}`)
})