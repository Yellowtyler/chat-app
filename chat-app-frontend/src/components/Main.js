import React from 'react'
import '../styles/main.css';
import Auth from './auth/Auth';
import Home from './chat/Home';
import Popup from './utils/Popup';
import { useRecoilState } from 'recoil';
import { isLoggedUser, popupActive } from '../recoil/example/atom';

export const Main = () => {

  const [isLogin, ] = useRecoilState(isLoggedUser);
  const [isActive, ] = useRecoilState(popupActive);
  return (
    <div className='container'>
        {!isLogin && <Auth/>}
        {isLogin && <Home/>}
        {isActive && <Popup/>}
    </div>
  );
}
