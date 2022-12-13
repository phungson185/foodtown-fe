import React from 'react'
import "./styles.css"

const Greet = () => {
  return (
    <div className='greet-container container wrapper' id='greet'>
        <div className='greet-content'>
            <p>No left-over</p>
            <p>No left-behind</p>
            <a href='#menu' className='btn btn-transparent greet-btn'>Mua ngay</a>
        </div>
    </div>
  )
}

export default Greet