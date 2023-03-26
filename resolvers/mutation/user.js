const User = require("../../schema/MonDBUser")
const bcrypt = require("bcryptjs")
const {dataAddS, dataAddF} = require("../../data")
const {GraphQLError} = require("graphql")
const {PubSub} = require("graphql-subscriptions")
const jwt = require("jsonwebtoken")
const {setCookie, getCookie} = require("cookies-next")

const pubSub = new PubSub()

const createUser = async (_, {content}) => {
    const {name, email, password, gender} = content
    if(!name || !email || !password || !gender) {
        throw new GraphQLError("All Feilds Required", {
            extensions: {code: "FEILD_INCOMPLETED"}
        })
    }
    if((await User.find({email: content.email})).length > 0) {
        throw new GraphQLError("This user already exists", {
            extensions: {
                code: "DUPLICATE_USER"
            }
        })
    }
    const hashedPassword = await bcrypt.hash(content.password, 10)
    pubSub.publish("POST_CREATED", {message: `${content.name} has been added.`})
    return await User.create({
        ...content,
        password: hashedPassword
    })
    
}

const loginUser = async (_, {email, password}, {req, res}) =>{
    const user = await User.findOne({email})
    if(user.length === 0) throw new GraphQLError("This User Not Exist")
    const verifyUser = await bcrypt.compare(password, user.password)
    if(!verifyUser) throw new GraphQLError("Invalid user or password")
    const token = jwt.sign({user: user.email}, "WHAT_THE_FUCK")
    setCookie("userToken", token, {
        req, res,
        maxAge: 24*3600,
        httpOnly: true,
        path: "/",
        domain: "localhost"
    })
    return user
}

module.exports = {createUser, loginUser}