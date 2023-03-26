const {res} = require("./res")

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String!
        email: String!
        password: String!
        gender: String!
        message: Message
    }
    input UserInput {
        name: String!
        email: String!
        password: String!
        gender: Gender!
    }
    type LoginUser {
        message: String!
    }
    enum Gender {
        male
        female
        others
    }
    type Subscription {
        messages: String
    }
    ${res}
    type Query {
        users: [User]
    }
    type Mutation {
        createUser(content: UserInput!): User
        loginUser(email: String!, password: String!): User
    }
`
module.exports = {typeDefs}