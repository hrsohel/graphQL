const {createUser, loginUser} = require("../resolvers/mutation/user")
const {users} = require("./query/user")
const {messages} = require("./subscription/message")

const resolvers = {
    Query: {
        users,
        
    },
    Mutation: {
        createUser, loginUser
    },
    Subscription: {
        messages
    }
}

module.exports = {resolvers}