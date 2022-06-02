import React, { useEffect, useState } from 'react';
import './App.css';
import useToken from './useToken';
import Home from './components/Home';
import LoginSell from './components/LoginSell';
import { BrowserRouter, Route, Routes  }
    from 'react-router-dom';
import LoginBuy from './components/LoginBuy';
import SignupSell from './components/SignupSell';
import SignupBuy from './components/SignupBuy';

function App() {
    const {token, setToken} = useToken();
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login-sell" element={<LoginSell/>}/>
            <Route path="/login-buy" element={<LoginBuy/>}/>
            <Route path="/signup-sell" element={<SignupSell setToken={setToken}/>}/>
            <Route path="/signup-buy" element={<SignupBuy setToken={setToken}/>}/>
          </Routes>
      </BrowserRouter>
    );
}

export default App;
