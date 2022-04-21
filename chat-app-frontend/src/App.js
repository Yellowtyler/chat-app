import Auth from './components/Auth';
import { useState } from 'react';
import Main from './components/Main';

const App = () => {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className='container'>
      {!isLogin && <Auth setIsLogin={setIsLogin}/>}
      {isLogin && <Main/>}
    </div>
  );
};

export default App;
