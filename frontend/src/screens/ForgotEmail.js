
import { Button, Container, Form } from 'react-bootstrap'
import React,{useContext, useEffect, useState} from 'react'
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom'
import Axios from 'axios'
import {Store} from '../Store'
import {toast} from 'react-toastify'
import { GoogleLogin } from 'react-google-login'


function ForgotEmail() {
    const{search}=useLocation();
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl ? redirectInUrl:'/'
 
 
  



    const[email,setEmail]=useState('');
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);


    const{state,dispatch:ctxDispatch}=useContext(Store)
    const{userInfo}=state;
    const { id } = useParams();

    const submitHandler=async(e)=>{
        e.preventDefault();
       
        
        try{
            
          
            const{data}=await Axios.post(`/api/users/forgot`,{
                email,
              
            });
         
        //     ctxDispatch({type:'USER_SIGNIN',payload:data})
        //   localStorage.setItem('userInfo',JSON.stringify(data));
        
          toast.success("please check your email")
          

        }catch(err){

          toast.error("otp is incorrect")

        }
    }
    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate,userInfo]);





  return (
      <>
         <Form  noValidate validated={validated}  onSubmit={submitHandler} >
    <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <div className='mb-3'>
                   <Button type="submit">Sign Up</Button>
               </div>
                  </Form>
                 
        </>


  )
}

export default ForgotEmail
