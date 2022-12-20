const messageControllers = require('./message.controllers')

const getAllMessages = (req, res) => {
    messageControllers.findAllMessages()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}


const postMessage = (req, res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id
    const {message} = req.body

    messageControllers.createMessage({userId, conversationId, message})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message, fields: {
                message: 'text'
            }})
        })
}

const getMessageByConversation = (req, res) => {
    const id = req.params.conversationId
    messageControllers.findMessageConversations(id)
        .then(data => {
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deleteMessage = (req, res) => {
    const id = req.params.message
    messageControllers.removeMessage(id)
        .then(data => {
            if(data) {
             res.status(204).json()
            } else {
                res.status(404).json({message: 'Invelid ID'})
            }
        })
        .cath((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getAllMessages,
    getMessageByConversation,
    postMessage,
    deleteMessage
}