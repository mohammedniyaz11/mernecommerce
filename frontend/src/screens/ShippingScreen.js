import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Helmet} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSreps from '../componenets/CheckoutSreps';

function ShippingScreen() {

    const{state,dispatch:ctxDispatch}=useContext(Store)
    const{
        userInfo,
        cart:{shippingAddress},
    }=state;
    const navigate=useNavigate();
    const[fullName,setFullName]=useState(shippingAddress.fullName||'');

    const[address,setAddress]=useState(shippingAddress.address||'');
    const[city,setCity]=useState(shippingAddress.city||'');
    const[postalCode,setPostalCode]=useState(shippingAddress.postalCode||'');
    const[country,setCountry]=useState(shippingAddress.country||'')
  


    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };



    const submitHandler=(e)=>{
        e.preventDefault();
      
    

      
        ctxDispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload:{
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });

        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })

        );
     
        navigate('/payment');
    }

    useEffect(()=>{
        if(!userInfo){
            navigate('/signin?redirect=/shipping')
        }
    },[userInfo,navigate])
  

  return (
      <>
    <div className='container small-container'>
        <Helmet>
            ShippingScreen
        </Helmet>
        <CheckoutSreps step1 step2></CheckoutSreps>
       <h1 className='my-3'>Shipping Screen</h1>

       <Form noValidate validated={validated}  onClick={handleSubmit}   onSubmit={submitHandler}>

           <Form.Group className='mb-3' controlId='fullName'>
           <Form.Label>Full fullName</Form.Label>
           <Form.Control value={fullName}
           onChange={(e)=>setFullName(e.target.value)} required/>
             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
           </Form.Group> 

           <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control value={address}
            onChange={(e)=>setAddress(e.target.value)} required/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3' controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control value={city}
            onChange={(e)=>setCity(e.target.value)} required/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>



            <Form.Group className='mb-3' controlId='PostalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)} required/>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>



         <Form.Group className='mb-3' controlId='Country'>
             <Form.Label>Country</Form.Label>
             <Form.Control value={country} onChange={(e)=>setCountry(e.target.value)} required/>
             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
             </Form.Group>
             
         <div className='mb-3'>
             <Button variant='primary' type='submit'>
                 Continue
             </Button>
             
             </div>             
             
             
         



        




       </Form>
      


    </div>
    </>
  )
}

export default ShippingScreen