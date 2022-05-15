import Auth from './components/Auth';
import Main from './components/Main';
import Popup from './components/Popup';
import { useRecoilState } from 'recoil';
import { isLoggedUser, popupActive } from './recoil/example/atom';

const App = () => {

  const [isLogin, ] = useRecoilState(isLoggedUser);
  const [isActive, ] = useRecoilState(popupActive);

  return (
    <div className='container'>
      {!isLogin && <Auth/>}
      {isLogin && <Main/>}
      {isActive && <Popup/>}
    </div>
  );
};

export default App;
