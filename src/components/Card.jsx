import React from 'react'

const Card = ({ image, type1, type2,name}) => {
  return (
    <div className='card-p'>
      <div className='card-img'><img className='image' src={image} alt="" /></div>
      <div><p>Name: {name}</p></div>
      <div className='card-types'>
        <p>Type: </p>
        <p>{type1}</p>
        <p>{type2}</p>
      </div>
      
    </div>
  )
}

export default Card