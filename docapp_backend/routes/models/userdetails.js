const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
    emailid:{ type:String, required: true, unique: true,},
    mobileno: { type:String, required: true, unique: true,},
    password: { type:String, required: true,},
    username: { type:String, required: true,default:"not given"},
    gender:{ type: String, enum: ["Male", "Female","Others"] },
    age:{ type: Number, min: 0, max: 100 },
    bloodGroup:String,
    height: Number,
    weight: {type:[Number]},
    address:{
        lane:String,
        city:String,
        state:String,
    },
    picture:{
        type:String
    },
    bloodGroup:String,
    temprature:{ type: Number, min: 40, max: 110 },
    bloodSugar:{type:[Number]},
    BP:{type:[{
        bplvalue:Number,
        bphvalue:Number
    }]},
},{
    timestamps: true
});

module.exports = mongoose.model("userdetails", userDetails);