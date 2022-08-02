import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

function Product(props) {
    const {product}=props
  return (
    <Card   >
       <Link to={`/product/${product.slug}`}>
       <img src={product.image} className="card-img-top" alt={product.name}></img>
       </Link>
       <Card.Body>
                 
       <Link to={`/product/${product.slug}`}>
       <Card.Title >{product.name}  </Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
      <Card.Text> <strong>${product.price}</strong> 
         </Card.Text>
         <Button>Add to cart</Button>
           
       </Card.Body>


     </Card>
  )
}

export default Product