
import { Button, Container, Form } from 'react-bootstrap'
import React,{useContext, useEffect, useState} from 'react'
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom'
import Axios from 'axios'
import {Store} from '../Store'
import {toast} from 'react-toastify'
import { GoogleLogin } from 'react-google-login'


function Token() {
    const{search}=useLocation();
 
 
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl ? redirectInUrl:'/'



    const[password,setPassword]=useState('');
    const[confirmpassword,setConfirmPassword]=useState('')
    const navigate=useNavigate()
    const [validated, setValidated] = useState(false);


    const{state,dispatch:ctxDispatch}=useContext(Store)
    const{userInfo}=state;
    const { id } = useParams();

    const submitHandler=async(e)=>{

        e.preventDefault();
        if(password !== confirmpassword){
            toast.error('password doesnot match');
            return;
          }
          if(password.length<6){
            toast.error('password is leass than 6');
            return;

          }
       
        
        try{
            
          
            const{data}=await Axios.post(`/api/users/reset/${id}`,{
                password,
              
            });
         
        //     ctxDispatch({type:'USER_SIGNIN',payload:data})
        //   localStorage.setItem('userInfo',JSON.stringify(data));
          navigate('/signin')
          toast.success("your password has been changed now you can  activataed please login ypur account")
          

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
    <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Paaword</Form.Label>
                      <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>Confirn-Paaword</Form.Label>
                      <Form.Control type="password" required onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <div className='mb-3'>
                   <Button type="submit">Reset password</Button>
               </div>
                  </Form>
                 
        </>


  )
}

export default Token