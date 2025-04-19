import userModel from "../models/userModel.js"
import {comparePassword, hashPassword,} from './../helpers/authHelper.js'
import JWT from "jsonwebtoken"

export const registerController = async (req,res) => {
    try{
        const {name,email,password,phone,address, answer}=req.body

        if (!name)      {return res.send({ error: "Name is Required" })}

        if (!email)     {return res.send({ message: "Email is Required" })}

        if (!password)  {return res.send({ message: "Password is Required" })}

        if (!phone)     {return res.send({ message: "Phone no is Required" })}

        if (!address)   {return res.send({ message: "Address is Required" })}

        if (!answer)   {return res.send({ message: "Answer is Required" })}

        
        //checking
        const existingUser=await userModel.findOne({email})

        if (existingUser){
            return res.status(200).send({
                success:false,
                message:"account exists please login"
            })
        }


        const hashedPassowrd = await hashPassword(password)

        const user=await new userModel(
            {name,
            email,
            phone,
            address,
            password:hashedPassowrd,
            answer
        }).save()

        res.status(201).send({
            success:true,
            message:"user registered succesfully",
            user,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          message: "Error in Registeration",
          error,
        })
      }
}

//post login
export const loginController=async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"invalid email or passwors"
            })
        }

        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email not registered"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Passwordddddddddd",
            })
        }
        
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: "7d",})

        res.status(200).send({
            success:true,
            message:"login sucessfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address, 
                role:user.role,    
            },
            token,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}



//fprgot password
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body
      if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" })
        }

        //check validation
        const user = await userModel.findOne({ email, answer })
      
        if (!user) {
            return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{ password: hashed})
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })
        } 
        catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes")
    } 
    catch (error) {
        console.log(error)
        res.send({error})
    }
}



export const updateProfileController=async(req,res)=>{
    try{
        const {address,phone}=req.body
        const user = await userModel.findById(req.user._id)

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                phone: phone || user.phone,
                address: address || user.address,
            },
            {new: true}
        )
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        })
    } 
    catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        })
    }
}
  