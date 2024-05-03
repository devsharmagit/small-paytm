const { z } = require("zod");
const { User } = require("../model/user.model.js");
const jwt = require("jsonwebtoken");
const { JWT_SECERET } = require("../config.js");
const {Account} = require("../model/account.model.js")

const signUpSchema = z.object({
  username: z.string().min(3).max(15),
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30).optional(),
  password: z.string().min(6),
});

const assignToken = (payload)=>{
    return jwt.sign(payload, JWT_SECERET)
}

const signup = async (req, res) => {

    try {
            // checks if the user has entered right data or not
  const {success, data} = signUpSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({
      message: "Incorrect Inputs",
    });

  // check if username alreadys exits or not
  const user = await User.findOne({ username: data.username });
  if (user)
    return res.status(409).json({
      message: "username is already taken",
    });

  const newUser = await User.create({ ...data });

  await Account.create({
    userId: newUser._id,
    balance: parseInt( 1 + Math.random()*10000)
  })

  const token = assignToken({userId: newUser._id})
  res.status(201).json({
    message: "Account Successfully created!",
    token,
  });
    } catch (error) {
        return res.status(500).json({message: "Something went wrong server side!"})
    }

};

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const signin =async (req, res) => {
try {
    const {success, data} = signInSchema.safeParse(req.body)
    if(!success)     return res.status(400).json({
        message: "Incorrect Inputs",
      });

      const user = await User.findOne({username: data.username, password: data.password})

      console.log(user)

      if(!user) return res.status(401).json({
        message: "Incorrect email or password !"
      })

const token = assignToken({userId: user._id})

res.json({
message: "successfully siggned in",
    token: token
})

} catch (error) {
    return res.status(500).json({message: "Something went wrong server side!"})
}
};

module.exports = {
  signup,
  signin
};
