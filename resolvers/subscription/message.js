const {PubSub} = require("graphql-subscriptions")

const pubSub = new PubSub()

const messages = {
    subscribe: () => pubSub.asyncIterator(["POST_CREATED"])
}

module.exports = {messages}