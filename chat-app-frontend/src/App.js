import Auth from './components/Auth';
import { useState } from 'react';
import Main from './components/Main';

const App = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='container'>
      {isLogin && <Auth/>}
      {!isLogin && <Main/>}
    </div>
  );
};

export default App;
