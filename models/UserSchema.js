const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnect'); 

const Signup = sequelize.define("Signup",{
    FirstName:{
        type:DataTypes.STRING,
        required:true
    },
    LastName:{
        type:DataTypes.STRING,
        required:true
    },
    Email:{
        type:DataTypes.STRING,
        required:true
    },
    PhoneNumber:{
        type:DataTypes.INTEGER,
        required:true
    },
    Password:{
        type:DataTypes.STRING,
        required:true
    },
    role:{
        type:DataTypes.STRING,
        enum:["Admin", "Patients"]
    }
})


module.exports =Signup