import express from 'express'
const productRouter=express.Router();
import Product from '../models/productModel.js';



productRouter.get('/',async(req,res)=>{
    const products=await Product.find();
    res.send(products)
})


productRouter.get('/slug/:slug',async(req,res)=>{
    const product = await Product.findOne({slug:req.params.slug});
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message:'Product not found'})
    }
 
});


productRouter.get('/:id',async(req,res)=>{
    const product = await Product.findById(req.params.id) ;
 
  
    if(product){
        res.send(product)
    }else{
      
        res.status(404).send({message:'Product not found'})
    }
 
});




export default productRouter