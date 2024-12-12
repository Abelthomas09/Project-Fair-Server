const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req,res)=>{
    console.log("Inside RegisterController");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Existed... Please Login!!!")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//login
exports.loginController = async (req,res)=>{
    console.log("Inside LoginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid Email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//profile updation
exports.editUserController = async (req,res)=>{
    console.log("inside editUserController");
    //get id for user from jwtmiddleware req.userId
    const userId = req.userId
    //multer will active in this route
    //get text data from req.body, file data from req.file
    const {username,email,password,github,linkedin,profilePic} = req.body
    const uploadProfileImgFile = req.file?req.file.filename:profilePic
    //update user - findByIdAndUpdate
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadProfileImgFile
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser) 
    }catch(err){
        res.status(401).json(err)
    }
    
}