const Users = require('./users.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')
const RecoveryPasswords = require('./recoveryPasswords.models')

const initModels = () => {
    //FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    //users - conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //Usuarios - participaciones tabla pivote entre users - conversations
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //conversations - messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //conversaciones del usuario
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

    Messages.belongsTo(Conversations)
    Conversations.hasMany(Messages)
}

module.exports = initModels