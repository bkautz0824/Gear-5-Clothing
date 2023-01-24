import mongoose from "mongoose"
import validator from "validator";
const snakeCaseStamps = {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }};
  

const Product = mongoose.model("Product", new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        // required: true,
        minlength: 3,
        // maxlength: 20,
    //     validate: [ validator.isAlphanumeric, "Name can only contain letters and numbers" ]
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        default: ""
    },
    brand: {
        type: String
    },
    original_price:{
        type: Number
    },
    current_price:{
        type: Number
    },
    category:{
        type:String
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    sizes:{
        type: {S:Number, M:Number, L:Number, XL:Number}
    },
    
    


}, snakeCaseStamps 
))

export default Product