const mongoose = require("mongoose");

const appointments = new mongoose.Schema({
    patientname: { type: String, required: true, },
    date: {type:Date },
    time: { type:String},
    department: { type: String },
    doctorname: { type: String },
    phoneno: { type: String },
    message :String,  
    amount: String
},
{
    timestamps: true
});

module.exports = mongoose.model("appointments", appointments);
