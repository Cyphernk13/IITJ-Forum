import Enter from './components/enter/Enter';
import SignUp from './components/enter/SignUp';
import Feed from './components/feed/Feed';
import Login from './components/enter/Login';
import Choice from './components/feed/Choice';
import Code from './components/enter/Code';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Success from './components/enter/Success';
import Profile from './components/profile/Profile';
import ForgotPwd from './components/enter/ForgotPwd';
import Edit from './components/profile/Edit';
import React from 'react';
import ViewQuestion from './components/feed/ViewQuestion';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Enter />}/>
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/choice' element={<Choice />} />
        <Route path='/success' element={<Success />} />
        <Route path='/Code' element={<Code />}/>
        <Route path='/forgot' element={<ForgotPwd />} /> 
        <Route path='/viewQuestion' element={<ViewQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
