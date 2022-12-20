const Messages = require('../models/messages.models')
const uuid = require('uuid')
const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models')

// const findMessageConversations = async (Id) => {
//     const data = await Messages.findAll({
//         where: {
//             Id: Id
//         }
//     })
//     return data
// }

const findAllMessages = async () => {
    const data = await Messages.findAll({
        include: {
                model : Conversations,
                include: {
                    model: Users
                }
        }
    })
    return data
}

// const findMessageById = async (conversationId) => {
//     const data = await Messages.findOne({
//         where: {
//             conversationId: conversationId
//         },
//         //     include: {
//         //         model: Conversations
//         // }
//     })
//     return data
// }

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

const findMessageConversations = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId: conversationId
        }
    })
    return data
}

const removeMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data
}


module.exports = {
    findAllMessages,
  findMessageConversations,
    createMessage,
    removeMessage
}