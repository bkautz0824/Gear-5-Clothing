import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.mjs";
import Product from "../models/product.mjs";
import _ from "lodash"

const userRouter = express.Router()

const createUser = async(req, res) => {
    let secret 
    let user = await User.findOne({username:req.body.username})
    if(user) return res.status(400).send("That username is already taken")
    // Insert the new user if they do not exist yet
  try {
    user = await new User(_.assign(_.pick(req.body, ['username', 'password']), { _id: new mongoose.Types.ObjectId() }))
    
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    console.log('RUNNING SAVE')
 
  secret = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : 'secret'
    const token = jwt.sign({ _id: user._id }, secret);
    
  return res.header('x-auth-token', token).send(_.assign(_.pick(user, ['_id', 'username', 'password']), {token: token}));
 
  } catch (errors) { 
    console.log(errors)
    let errorMessages = []
      Object.keys(errors).forEach(key => errorMessages.push(errors[key].properties.message))
    console.log(errors)
    const errorObject = {
      errors: errorMessages
    }
    return res.send(errorObject).status(403)
  }
}; 
userRouter.post('/create', createUser)

const getAllUsers = async(req, res) => {
    const users = await User.find({})
    return res.send(users)
}
userRouter.get('/get-all-users', getAllUsers)

const getOneUser = async(req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(401).send('ID input is empty');
  try { 
    return await User.findOne({ _id: req.params.id })
    .populate("item_listings cart").lean()
    .exec((err, item) => {
      if(!err) return res.send(_.pick(item, ['_id', 'username', 'item_listings', 'created_at', 'updated_at', 'cart']))
    }
    )} 
    catch(err) { return res.status(404).send('User not found 1')}
}

userRouter.get('/:id', getOneUser)

const addProductToCart = async(req, res) => {
  let user 
  let product
  try{
    await User.findOne({ _id: req.body.user_id}).then((res) => user = res).catch((err) => console.log(err))
    await Product.findOne({ _id: req.body.product_id}).then((res) => product = res).catch((err) => console.log(err))
    console.log(user, product)
    if(!user || !product) return res.status(404).send("User or Product could not be found")
    user.cart.push(product._id) 
    await user.save()
    return res.send(user.cart)
  }
  catch(err){
    return res.status(400).send(err)
  }

}

userRouter.post('/add-to-cart', addProductToCart)

const removeFromCart = async(req, res) => {
  let user
  let product
  try{
    await User.findOne({ _id: req.body.user_id}).then((res) => user = res).catch((err) => console.log(err))
    await Product.findOne({ _id: req.body.product_id}).then((res) => product = res).catch((err) => console.log(err))
    console.log(user, product)
    const productIndex = user.cart.findIndex(item => item.equals(req.body.product_id))
    console.log(productIndex)
    if(productIndex === -1) return res.status(404).send("Product is not found in cart")
    user.cart.splice(productIndex, 1)
    await user.save()
    return res.send(user)

  }catch(err){
    return res.status(400).send(err)
  }
}

userRouter.delete('/remove-from-cart', removeFromCart)

export default userRouter