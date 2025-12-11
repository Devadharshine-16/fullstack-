const mongoose = require('mongoose');
const uri="mongodb+srv://root:root@cluster0.k1wedwy.mongodb.net/foodDB"

const foodSchema = new mongoose.Schema({
    foodName:{
        type : String,
        required : true
    },
    daySinceIate:{
        type : Number,
        required : true
    }
});



const food = mongoose.model('food',foodSchema);
module.exports = food;
 