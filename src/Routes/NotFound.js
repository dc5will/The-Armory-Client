import React from 'react';
import whichone from '../resources/whichone.gif'
import './notFound.css'

export default function PageNotFound(){
  return ( 
    <div className='notFound-container'>
      <h1>404 Not Found</h1>
        <h3>What page were you looking for?</h3>
        <img className='NotFound' src={whichone} alt='Jared from Silicon Valley'/>
    </div>
  )
}