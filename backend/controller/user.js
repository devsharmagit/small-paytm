const { z } = require("zod");
const { User } = require("../model/user.model");

const updateUserSchema = z.object({
    firstName: z.string().min(3).max(30).optional(),
    lastName: z.string().min(3).max(30).optional(),
    password: z.string().min(6).optional()
})

const userUpdateInfo = async(req, res)=> {
    try {
const {success, data} = updateUserSchema.safeParse(req.body)

console.log({success, data})

if(!success) return res.status(411).json({
    message: "invalid data"
})
console.log(req.userId)

const user = await User.findByIdAndUpdate(req.userId, {...data})

console.log(user)

res.json({message: "user updated successfully"})
        
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong server side"
        })
    }

}

const getUsers = async (req, res)=>{
    try {

        const filter = req.query.filter || ""

        const users = await User.find({$or: [{firstName: {$regex: filter}}, {lastName: {$regex: filter}}]}).select("username firstName lastName _id")

        return res.json({
            users
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong server side"
        })
    }

}

module.exports = {
    userUpdateInfo, getUsers
}