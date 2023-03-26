const { default: mongoose } = require("mongoose");
const {InMemoryLRUCache} = require("@apollo/utils.keyvaluecache")

const User = require("../../schema/MonDBUser")

const users = async (_, args, context) => {
     const cache = new InMemoryLRUCache()
     console.log(cache)
     return await User.find()
}

module.exports = {users}