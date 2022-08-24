import React,{useContext, useEffect, useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import Axios from 'axios'
import {Store} from '../Store'
import {toast} from 'react-toastify'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'









function SignupScreen() {
  const responseFacebook = (response) => {
    console.log(response);
  }
  const componentClicked=()=>{
    console.log("the component is clicked")

  }
      
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: '596510111275-0ec7d37th9e08pc5s1ortpf5gmefdmn5.apps.googleusercontent.com',
  //       scope: 'email',
  //     });
  //   }

  //   gapi.load('client:auth2', start);
  // }, [])
  


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
 

    const responseGoogle = (response) => {
      try{
        console.log(response)
      }catch(err){
        console.log(err)
      }
    }


    const responseGoogleSuccess = async (response) => {
      try {
        const result = await  Axios({
          method: 'POST',
          url: `/api/users/googlelogin`,
          data: { idToken: response.tokenId }
        });
        ctxDispatch({type:'USER_SIGNIN',payload:result})
            localStorage.setItem('userInfo',JSON.stringify(result));
            navigate(redirect||'/')

      } catch (error) {
        console.log(error);
      }
  }
  const responseGoogleError = (response) => {
          console.log(response)
         
  }
   
 
      const submitHandler=async(e)=>{
          e.preventDefault();
          if(password !== confirmPassword){
            toast.error('password doesnot match');
            return;
          }
          if(password.length<6){
            toast.error('password is leass than 6');
            return;

          }
          
          try{
              const{data}=await Axios.post('api/users/regiester',{
                  name,
                  email,
                  password,
              });
            //   ctxDispatch({type:'USER_SIGNIN',payload:data})
            // localStorage.setItem('userInfo',JSON.stringify(data));
            toast.success("check your email")

          }catch(err){

            toast.error("the email is alredy present")

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
                      <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} required></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password"  onChange={(e)=>setPassword(e.target.value)} required></Form.Control>
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
        

  <GoogleLogin
          clientId='895388844820-gjfhi8qp7k06feenn72msqbubu663q2k.apps.googleusercontent.com'
          buttonText="Sign in with Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleError}
          cookiePolicy={'single_host_origin'}
         
      />
      
  
 
          
  



      </div>
   
  )
}

export default SignupScreen