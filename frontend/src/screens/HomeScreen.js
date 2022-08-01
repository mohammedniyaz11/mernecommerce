import React from 'react'
import data from '../data'
import {Link} from 'react-router-dom'

function HomeScreen() {
  return (
    <div><h1>Featured Products</h1>
    <div className="products">
    {
     data.products.map(product=>(
     <div  className="product"       key={product.slug}>
       <Link to={`/product/${product.slug}`}>
       <img src={product.image} alt={product.name}></img>
       </Link>
       <div className="product-info">
       <p>
       <Link to={`/product/${product.slug}`}>
         {product.name}
         </Link>
       </p>
      
       <p>
       <Link to={`/product/${product.slug}`}>
        <strong>${product.price}</strong> 
         </Link>
       </p>
   
       <button>Add to cart</button>
       </div>

     </div>))

    }
    </div></div>
  )
}

export default HomeScreen