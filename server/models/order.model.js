import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require: true,
    },
    items: [{
        book:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Book",
            require: true,
        },
        title:{
            type: String,
            require: true
        },
        price:{
            type:Number,
            require:true
        },
        quantity:{
            type:Number,
            require: true
        }
    }],
    totalAmount:{
        type:Number,
        require:true
    },
    status:{
        type:String,    
        enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
        default: "pending",        
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    address: {
        fullname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
    },
}, {timestamps:true})

const Order = mongoose.model("Order", orderSchema);
export default Order;