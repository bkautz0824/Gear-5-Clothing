import mongoose from "mongoose";
import express from "express";
import Product from "../models/product.mjs"
import User from "../models/user.mjs";
import _ from "lodash"



const productRouter = express.Router()

const createProduct = async(req, res) => {
let user
await User.findOne({ _id: req.body.seller }).then(ele=>{ user = ele})
  console.log(user)
  if (!user) return res.status(404).send('User does not exist.')
  let product = new Product(_.assign(
    _.pick(req.body, ['title', 'name', 'description', 'image', 'brand', 'original_price', 'current_price', 'category']), {
    seller: new mongoose.Types.ObjectId(req.body.seller) 
  },
  {_id: new mongoose.Types.ObjectId()}
  ))



  user.item_listings.push(product._id);
  await user.save()
  await product.save()
  // console.log(post)  

  return res.send(product)

}

productRouter.post('/create', createProduct)

const getAllProducts = async(req, res) => {
  const products = await Product.find({})
  return res.send(products)
}
productRouter.get('/get-all-products', getAllProducts)


const getProductById = async(req, res) =>{
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(401).send('ID input is empty');

  try{
    return await Product.findOne({ _id: req.params.id })
    .then((item) => res.send(item))
  }
  catch(err){
    return res.status(404).send('Product not found')
  }

}

productRouter.get('/:id', getProductById)





const createManyProducts = async(req, res) => {
  await Product.deleteMany()
  let user = await User.findOne({_id: '639caa6e164b34f189274af2'})
  user.item_listings = []
  const newItemList = 
  itemList.map( async({subcategory, name, current_price, raw_price, image_url}) => 
     {
      const newItem = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      category: subcategory,
      image: image_url,
      original_price: raw_price,
      current_price: current_price,
      seller: user._id
     })
    user.item_listings.push(newItem);
    await newItem.save()
    return newItem
    }

  )
  
  await user.save()
  // await Product.insertMany(newItemList)
  return res.send(newItemList)
  // let product = new Product(_.assign(
  //   _.pick(req.body, ['title', 'name', 'description', 'image', 'brand', 'original_price', 'current_price', 'category']), {
  //   seller: new mongoose.Types.ObjectId(req.body.seller) 
  // },
  // {_id: new mongoose.Types.ObjectId()}
  // ))


 
 
  // await newItem.save()
  // console.log(post)  

  
}

productRouter.post('/create-many', createManyProducts)

export default productRouter