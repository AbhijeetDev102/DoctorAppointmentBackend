const { where } = require("sequelize")
const bcrypt = require("bcrypt")
const userdata = require("../models/UserSchema")
const jwt = require("jsonwebtoken")

require("dotenv").config();

exports.Signup = async (req, res)=>{
    try {
        const {firstName,lastName,email,phoneNumber,password, confirmPassword, role}= req.body

        if(password!=confirmPassword){
            return res.json({
                success:false,
                message:"Password doesn't match"
            })
        }

        const UserExist = await userdata.findOne({ where:{email} })

        if(UserExist){
            return res.json({
                success:false,
                message:"User already exist please login"
            })
        }
        
        const hasedpass = await bcrypt.hash(password, 10)


            await userdata.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password :hasedpass,
            role
        })

        
        

        return res.json({
            success:true,
            message:"User created successfully "
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
        
    }
}


exports.Login = async(req, res)=>{
    try {
        const {email, password}= req.body;
        const userExist = await userdata.findOne({where:{email}})
        if(!userExist){
            return res.json({
                success:false,
                message:"No user exist with this email please Signup first"
            })
        }

        const pass = bcrypt.compare(password, userExist.password)
        if(!pass){
            return res.json({
                success:false,
                messgae:"Password is incorrect"
            })
        }

        const payload = {
            firstName:userExist.firstName,
            lastName:userExist.lastName,
            email:userExist.email,
            role:userExist.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRETE )

        return res.json({
            success:true,
            token:token,
            userData:{
                firstName:userExist.firstName,
                lastName:userExist.lastName,
                email:userExist.email,
            },
            message:"User loggedin successfully"
        })



    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
        
    }
}