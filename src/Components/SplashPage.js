import React, {useState} from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';


export default function SplashPage() {
   
  const [toggle, setToggle] = useState(false)

  return toggle !== true ? (
    <div>
    <RegistrationForm/>
    <button onClick={e => setToggle(true)}>Already a member?</button>
    </div>
  ) : (
    <div>
    <LoginForm/>
    <button onClick={e => setToggle(false)}>Not a member?</button>
    </div>
  )

}