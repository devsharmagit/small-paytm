const {User} = require("../model/user.model.js")
const {Account}  = require("../model/account.model.js")
const { z } = require("zod");
const { default: mongoose } = require("mongoose");


 const getBalance = async (req, res)=>{

    try {
        const account = await Account.findOne({userId: req.userId})
        return res.json({
            balance: account.balance
        })
    } catch (error) {
        res.status(500).json({message: "something went wrong server side!"})
    }

}

const transferSchema = z.object({
    to: z.string(),
    amount: z.number().positive()
})

const transfer = async (req,res)=>{
    try {
      const {data, success} = transferSchema.safeParse(req.body)  
      if(!success) return res.status(411).json({
        message: "Please enter valid data!"
      })

      const session = await mongoose.startSession()

      session.startTransaction()
        
        // check if user has that much money or not
        const account = await Account.findOne({userId: req.userId})
        if(account.balance < data.amount){
            await session.abortTransaction();
            return res.status(400).json({message: "insufficient fund !"})}

        // check if other account exists or not
        const secondAccount = await Account.findOne({userId: data.to})    

        if(!secondAccount){
            await session.abortTransaction();
            return res.status(400).json({message: "Invaild account"})}

        await Account.findOneAndUpdate({userId: req.userId}, {$inc : {balance: -data.amount}})
        await Account.findOneAndUpdate({userId: data.to}, {$inc : {balance: data.amount}})

        await session.commitTransaction();


        return res.status(200).json({
            message: "Successfully Transfered."
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "something went wrong server side!"})
    }
}

module.exports = {
    getBalance,
    transfer
}