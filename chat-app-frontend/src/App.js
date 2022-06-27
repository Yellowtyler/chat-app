import Auth from './components/auth/Auth';

import Popup from './components/chat/Popup';
import { useRecoilState } from 'recoil';
import { isLoggedUser, popupActive } from './recoil/example/atom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetPassword } from './components/auth/ResetPassword';
import { Main } from './components/Main';
const App = () => {

  const [isLogin, ] = useRecoilState(isLoggedUser);
  const [isActive, ] = useRecoilState(popupActive);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main/>}></Route>
          <Route path="reset" element={<ResetPassword/>}></Route>  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
