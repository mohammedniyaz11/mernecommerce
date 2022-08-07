import Product from '../models/productModel.js'
import data from '../data.js'


// module.exports.Seed=async(req,res)=>{
// await Product.remove({});
// const createdProducts=await Product.insertMany(data.products)
// res.send({createdProducts})

// }
module.export.Seed = async(req,res)=>{
    await Product.remove({});
    const createdProducts=await Product.insertMany(data.products)
    res.send({createdProducts})
    
    }