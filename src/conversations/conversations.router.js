const router = require('express').Router()
const conversationServices = require('./conversations.services')
const messageServices = require('../message/message.services')
const passportJWT = require('../middlewares/auth.middleware')
const participantValidate = require('../middlewares/participantValidate.middleware')
const messageValidate = require('../middlewares/messageValidate.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.getAllMessages)
    .post(passportJWT.authenticate('jwt', {session: false}), participantValidate, messageServices.postMessage)
    
router.route('/:conversation_id/messages/:messages_id')
    .get(passportJWT.authenticate('jwt', {session: false}), messageValidate, messageServices.getMessageByConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), messageValidate, messageServices.deleteMessage)

    

module.exports = router