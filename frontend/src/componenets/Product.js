import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'
import { Store } from '../Store'
import axios from 'axios'

function Product(props) {
    const {product}=props;
  const{state,dispatch:ctxDispatch}=useContext(Store);

  const {
    cart: { cartItems },
  } = state;


  const addToCartHandler=async(item)=>{
    // const exitsiItem=item.cartItems.find((x)=>x._id===product._id)
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity=existItem ? existItem.quantity+1:1;

    const {data}=await axios.get(`/api/products/${item._id}`)
    if(data.countInStock<quantity){
      window.alert('Sorry.product is out of stock');
      return;
    }
    ctxDispatch({
      type:'CART_ADD_ITEM',
      payload:{...item,quantity}
    })
  }


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
         {product.countInStock===0?(<Button variant='light' disabled>Out of stock</Button>):(
         <Button onClick={()=>addToCartHandler(product)}>Add to cart</Button>)}
           
       </Card.Body>


     </Card>
  )
}

export default Product