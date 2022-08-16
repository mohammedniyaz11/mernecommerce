import React,{useContext, useEffect, useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import Axios from 'axios'
import {Store} from '../Store'
import {toast} from 'react-toastify'
import { getError } from '../utils'


function SignupScreen() {
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);
    
    const{search}=useLocation();
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl ? redirectInUrl:'/'

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };


    const[email,setEmail]=useState('');
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('')
    
 
    const{state,dispatch:ctxDispatch}=useContext(Store)
    const{userInfo}=state;
   

      const submitHandler=async(e)=>{
          e.preventDefault();
          if(password !== confirmPassword){
            toast.error('password doesnot match');
            return;
          }
          try{
              const{data}=await Axios.post('/api/users/signup',{
                  name,
                  email,
                  password,
              });
              ctxDispatch({type:'USER_SIGNIN',payload:data})
            localStorage.setItem('userInfo',JSON.stringify(data));
            navigate(redirect||'/')

          }catch(err){

            toast.error(getError(err))

          }
      }
      useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [navigate, redirect, userInfo]);


  return (
      <div>
          <Container className='small-container'>
              <Helmet>
                  <title>Sighn up</title>
              </Helmet>

              <h1 className='my-3'>Sign up</h1>

              <Form  noValidate validated={validated} onClick={handleSubmit}  onSubmit={submitHandler} >
              <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" required onChange={(e)=>setName(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                
                  <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>



                  <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" required onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>    
           
                  
                 
               <div className='mb-3'>
                   <Button type="submit">Sign Up</Button>
               </div>

               <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
              </Form>
          </Container>



      </div>
   
  )
}

export default SignupScreen