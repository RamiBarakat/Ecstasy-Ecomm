import React from 'react'
import './LandingPage.css'

export default function LandingPage({onStartShoppingClick}) {



  return (
    <div className='landing'>
        <div className='left'>
            <h1>WELCOME TO</h1>
            <h1>THE FUTURE OF</h1>
            <h1>Shopping!</h1>
            <button onClick={onStartShoppingClick}>Start Shopping!</button>

        </div>
        <div className='right'>

        </div>
      
    </div>
  )
}
