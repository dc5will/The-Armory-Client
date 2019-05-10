import React from 'react';
import './notFound.css'
import config from '../config';

export default function PageNotFound(){
  return ( 
    <div className='notFound-container'>
      <h1>404 Not Found</h1>
        <h3>What page were you looking for?</h3>
        <img className='NotFound' src={`${config.IMAGES_ENDPOINT}/whichone.gif`} alt='Jared from Silicon Valley'/>
    </div>
  )
}