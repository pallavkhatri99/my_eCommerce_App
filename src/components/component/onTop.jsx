import { Button } from '@mui/material'
import { useEffect } from 'react'

function OnTop() {
   

  return (
    <div>
        <Button variant="text" color={'inherit'} style={{width:"100%",cursor:"pointer",color:"gray"}} onClick={()=> window.scrollTo(0, 0)}>Back on Top</Button>
    </div>
  )
}

export default OnTop;