import Auth from './components/Auth';
import Main from './components/Main';
import { useRecoilState } from 'recoil';
import { isLoggedUser } from './recoil/example/atom';
import Popup from './components/Popup';
import { useState } from 'react';

const App = () => {

  const [isLogin, setIsLogin] = useRecoilState(isLoggedUser);
  const [isActive, setActive] = useState(true);

  return (
    <div className='container'>
      {!isLogin && <Auth setIsLogin={setIsLogin} setActivePopup={setActive}/>}
      {isLogin && <Main setIsLogin={setIsLogin}  setActivePopup={setActive}/>}
      {isActive && <Popup setActive={setActive}/>}
    </div>
  );
};

export default App;
