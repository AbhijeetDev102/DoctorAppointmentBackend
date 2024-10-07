const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect'); 

const Signup = sequelize.define("Signup",{
    firstName:{
        type:DataTypes.STRING,
        required:true
    },
    lastName:{
        type:DataTypes.STRING,
        required:true
    },
    email:{
        type:DataTypes.STRING,
        required:true
    },
    phoneNumber:{
        type:DataTypes.INTEGER,
        required:true
    },
    password:{
        type:DataTypes.STRING,
        required:true
    },
    role:{
        type:DataTypes.STRING,
        enum:["Admin", "Patient"]
    }
})


module.exports =Signup