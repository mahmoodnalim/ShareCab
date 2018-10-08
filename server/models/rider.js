const mongoose  = require('mongoose')

const Schema = mongoose.Schema
const riderSchema = new Schema({
    firstName : String,
    lastName : String,
    email :String ,
    password : String,
    contact : String,
    isDriver : Boolean
})

 

module.exports = mongoose.model('rider', riderSchema, 'riders')
 