import { model, Schema } from 'mongoose'

const  collection = 'products'

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '/imgaes/company-logo.png' }
})

const Product = model(collection, schema)

export default Product