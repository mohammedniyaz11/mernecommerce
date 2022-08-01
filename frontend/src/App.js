
import './App.css';
import  {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
    
    <div >
      <header >
    <a href="/">amazona</a>
      </header>

      <main>
        <Routes>
          <Route path='/product/:slug' element={<ProductScreen/>}/>
         <Route path='/' element={<HomeScreen/>}/>
        </Routes>
        
      </main>
    </div>
    </BrowserRouter>
  );

}


export default App;
