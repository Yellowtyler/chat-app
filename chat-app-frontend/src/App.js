import Auth from './components/Auth';
import Main from './components/Main';
import { useRecoilState } from 'recoil';
import { isLoggedUser } from './recoil/example/atom';
import Popup from './components/Popup';
import { useState } from 'react';

const App = () => {

  const [isLogin, ] = useRecoilState(isLoggedUser);
  const [isActive, setActive] = useState(false);

  return (
    <div className='container'>
      {!isLogin && <Auth setActivePopup={setActive}/>}
      {isLogin && <Main setActivePopup={setActive}/>}
      {isActive && <Popup setActive={setActive}/>}
    </div>
  );
};

export default App;
