const {findMessageConversations} = require('../message/message.controllers')

const messageValidate = (req, res, next) =>{
    const conversationId = req.params.conversationId
    const userId = req.user.id

    findMessageConversations(conversationId, userId)
        .then(data => {
            if(data){
                next()
            } else {
                res.status(400).json({message: 'You are not allow to see this message'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

module.exports = messageValidate