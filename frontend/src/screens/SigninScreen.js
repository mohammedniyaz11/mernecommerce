import React,{useState} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link,useLocation } from 'react-router-dom'


function SigninScreen() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };



    const{search}=useLocation();
    const redirectInUrl=new URLSearchParams(search).get('redirect');
    const redirect=redirectInUrl ? redirectInUrl:'/'
  return (
      <div>
          <Container className='small-container'>
              <Helmet>
                  <title>Sighn in</title>
              </Helmet>
              <h1 className='my-3'>Sign In</h1>
              <Form  noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" required></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" required></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" required></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
               <div className='mb-3'>
                   <Button type="submit">Sign in</Button>
               </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
              </Form>
          </Container>



      </div>
   
  )
}

export default SigninScreen