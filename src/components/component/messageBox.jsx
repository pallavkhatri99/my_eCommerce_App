import React, { useEffect, useState } from 'react'
import '../../css/msgBox.css'
function MessageBox(props) {
    let { msg,type } = props
    let [isDisplay,setDisplay] = useState(false)
    useEffect(()=>{
        setDisplay(true)
        let timer = setTimeout(() => setDisplay(false) , 2000);
        return () => clearTimeout(timer);
    },[])
  return (
    <>
    {isDisplay ?
    <div className='msgBox' style={{display:isDisplay?'block':'none'}}>
        <div className='msgBox-container'>
            <div className="inner-msgbox">
                <div className='msgBox-img'>
                    {type == "S" ?
                    <img src='https://cdn-icons-png.flaticon.com/512/10308/10308146.png' width='100px' height='100px'/>
                    :<img src='https://cdn-icons-png.flaticon.com/512/6711/6711656.png' width='100px' height='100px'/>
                    }
                </div>
                <div className="msg-heading">
                    {msg}
                </div>
            </div>
        </div>
    </div>:""}
    </>
  )
}

export default MessageBox