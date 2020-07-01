import React, {useContext} from 'react';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './App.css';
import Login_Register_Panel from "./Login_Page/Panel/Login_Register_Panel";


function App() {
  return (
      <div className='PageWrapper'>
      <Login_Register_Panel />
      </div>
  );
}




export default App;
