import React, {useEffect} from 'react';
import config from '../config';



export default function Confirmation(props){
  async function confirm(){
  return fetch(`${config.API_ENDPOINT}${window.location.pathname}`, {
    headers: {
      "content-type": "application/json"
    }
  }).then(res =>
    !res.ok ? console.log(res) : props.history.push('/') 
    //eventually we would want to route to 404 if res is not ok
  )};

  useEffect(()=>{
    confirm();
  }, []
)

}