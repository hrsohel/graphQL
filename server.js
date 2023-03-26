const {ApolloServer} = require("@apollo/server")
const {InMemoryLRUCache} = require("@apollo/utils.keyvaluecache")
const {startStandaloneServer} = require("@apollo/server/standalone")
const {typeDefs} = require("./schema/user")
const {resolvers} = require("./resolvers/index")
const mongoose = require("mongoose")
const {createServer} = require('http')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {WebSocketServer} = require('ws')
const {useServer} = require('graphql-ws/lib/use/ws')
const express = require('express')
const app = express()
const cors = require("cors")
const {expressMiddleware} = require("@apollo/server/express4")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
 
mongoose.connect("mongodb://localhost:27017/graphql_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected", () => console.log("Database Connected..."))
mongoose.connection.on("error", err => console.log(err))

const httpServer = createServer(app)
const schema = makeExecutableSchema({typeDefs, resolvers})
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/"
})

const serverCleanUp = useServer({schema}, wsServer)

const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanUp.dispose()
            }
          }
        }
      }
    ],
}) 

async function startServer() {
  await server.start()
  app.use("/graphql", cors(), bodyParser.json(), cookieParser(), expressMiddleware(server, {
    context: async({req, res}) => {
      return {req, res, cache: new InMemoryLRUCache()}
    }
  }))
}
startServer()

httpServer.listen(3000, () => console.log("Server Listening ..."))