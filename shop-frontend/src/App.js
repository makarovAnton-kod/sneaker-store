import NavBar from './components/NavBar/NavBar';
import {BrowserRouter, Routes, Router, Route} from 'react-router-dom';
import LoginSignUp from './features/LoginSignUp';
import Cart from './features/Cart';
import Shop from './features/Shop';
import Products from './features/Products';
import Footer from './components/Footer';
import Checkout from './features/Checkout';
import UserProfile from './features/UserProfile';
import Login from './features/users/Login';
import Register from './features/users/Register';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavBar/>
            <main>
                <Routes>
                    <Route path="/" element={<Shop/>}/>
                    <Route path="/products" element={<Products/>}>
                        <Route path=":productId" element={<Products/>}/>
                    </Route>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>

    </div>
  );
}

export default App;
