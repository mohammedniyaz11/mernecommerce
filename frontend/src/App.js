
import './App.css';
import  {BrowserRouter, Route, Routes,Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {Container, Navbar,Nav,  Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useContext } from 'react';
import { Store } from './Store';

function App() {
  const{state}=useContext(Store);
  const{cart}=state;
  return (
    <BrowserRouter>
    
    <div className='d-flex flex-column site-container' >
      <header >
        <Navbar bg="dark" variant="dark">
          <Container >
            <LinkContainer to="/">
            <Navbar.Brand>
            amazona 
           </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                cart
                {
                  cart.cartItems.length>0 &&(
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a,c)=>a+c.quantity,0)}

                    </Badge>
                  )
                }

              </Link>

            </Nav>
          </Container>
        
  
    </Navbar>
      </header>

      <main>
        <Container className='mt-3'>
        <Routes>
          <Route path='/product/:slug' element={<ProductScreen/>}/>
         <Route path='/' element={<HomeScreen/>}/>
        </Routes>
        </Container>
        
      </main>
      <footer>
        <div className='text-center'>ALL rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );

}


export default App;
