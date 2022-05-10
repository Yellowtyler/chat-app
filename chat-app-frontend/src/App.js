import Auth from './components/Auth';
import Main from './components/Main';
import { useRecoilState } from 'recoil';
import { isLoggedUser } from './recoil/example/atom';

const App = () => {

  const [isLogin, setIsLogin] = useRecoilState(isLoggedUser);

  return (
    <div className='container'>
      {!isLogin && <Auth setIsLogin={setIsLogin}/>}
      {isLogin && <Main setIsLogin={setIsLogin}/>}
    </div>
  );
};

export default App;
