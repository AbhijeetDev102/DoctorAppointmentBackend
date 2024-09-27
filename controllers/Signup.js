const { where } = require("sequelize")
const bcrypt = require("bcrypt")
const userdata = require("../models/UserSchema")
const jwt = require("jsonwebtoken")

require("dotenv").config();

exports.Signup = async (req, res)=>{
    try {
        const {FirstName,LastName,Email,PhoneNumber,Password, ConfirmPassword, Role}= req.body

        if(Password!=ConfirmPassword){
            return res.json({
                success:false,
                message:"Password doesn't match"
            })
        }

        const UserExist = await userdata.findOne({ where:{Email} })

        if(UserExist){
            return res.json({
                success:false,
                message:"User already exist please login"
            })
        }
        
        const hasedpass = await bcrypt.hash(Password, 10)


            await userdata.create({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password :hasedpass,
            Role
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
        const {Email, Password}= req.body;
        const userExist = await userdata.findOne({where:{Email}})
        if(!userExist){
            return res.json({
                success:false,
                message:"No user exist with this email please Signup first"
            })
        }

        const pass = bcrypt.compare(Password, userExist.Password)
        if(!pass){
            return res.json({
                success:false,
                messgae:"Password is incorrect"
            })
        }

        const payload = {
            FirstName:userExist.FirstName,
            LastName:userExist.LastName,
            Email:userExist.Email,
            Role:userExist.Role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRETE )

        return res.json({
            success:true,
            token:token,
            userData:{
                FirstName:userExist.FirstName,
                LastName:userExist.LastName,
                Email:userExist.Email,
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