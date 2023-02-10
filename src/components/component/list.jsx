import React from 'react'

function List() {

    const listArray = ['Audio','Electronics GST Store','Cameras & Accessories','Computer Peripherals',
    'Gaming','Health & Personal Care','Smart Home automati','Powerbank','MobileAccessory','Laptop and Desktop','Laptop Accessories']


  return (
    <>
        <div className="list">
            {listArray.map((item)=><div className="list-item">{item}</div>)}
        </div>
    </>
  )
}

export default List