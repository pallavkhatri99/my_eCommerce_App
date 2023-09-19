import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import '../../css/login.css'
import { AccountCircle, Construction } from '@mui/icons-material'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector,useDispatch } from 'react-redux';
import { addToCartProduct, addToMyFAvProduct, logout,setLogInOut } from '../../Redux/counterSlice';
import { getAxios, postAxios } from '../../api/useAxios/useAxios';
import MessageBox from '../component/messageBox';

function Login() {
  const [isloginboxShow,setdisplayLoginBox] = useState(1)
  const [isSignupShow,setdisplaySignupBox] = useState(0)
  let [msgBox,setMsgBox] = useState('')
  let [userLogin,setUserLogin] = useState({userID:"",userPass:""})
  let [loginError,setLoginError] = useState({userID:false,userPass:false})
  let [userDetails,setUserDetails] = useState({userName:"", userMob:"",userEmail:"",userPass:""})
  let [userError,setUserError] = useState({userName:false, userMob:false,userEmail:false,userPass:false})
  const dispatch = useDispatch();
  const isShowLogin =  useSelector((state)=> state.activeUser.value);
  const locallyTestLogin = useSelector((state)=>state.activeUser.server == 'local' ? true:false);
  const [isShowHidePass,setShowHidePass] = useState(false)
  const handleChangeLogin = (e) => {
    const {value,id} = e.target
    setUserLogin({...userLogin,[id]:value})
  }
  const handleChanges = (e) => {
    const {value,id} = e.target
    setUserDetails({...userDetails,[id]:value})
  }
  const validationCreateAcc = (data) =>{
    let error={}
    data.userName ? error.userName= false : error.userName= true;
    data.userMob ? error.userMob= false : error.userMob= true;
    data.userEmail ? error.userEmail= false : error.userEmail= true;
    data.userPass ? error.userPass= false : error.userPass= true;
    setUserError({userName:error.userName, userMob:error.userMob,userEmail:error.userEmail,userPass:error.userPass})
    if(!error.userName && !error.userMob && !error.userEmail && !error.userPass)
      return true
    else
      return false

  }
  const createAccount = () =>{
    if(validationCreateAcc(userDetails)){
      postAxios("/register",userDetails)
      .then((result)=>{
        if(result.data.includes("Sucesssfully")){
          setMsgBox(<MessageBox msg={result.data} type={"S"}/>)
          setUserDetails({userName:"", userMob:"",userEmail:"",userPass:""})
          setdisplayLoginBox(1);
          setdisplaySignupBox(0);
        }else{
          setMsgBox(<MessageBox msg={result.data} type={"E"}/>)
        }
      })
      .catch(err=>console.log(err))
    }
  }
  const validationlogin = (data) =>{
    let error={}
    data.userID ? error.userID=false : error.userID = true
    data.userPass ? error.userPass=false : error.userPass = true
    setLoginError({userID:error.userID,userPass:error.userPass})
    if(!error.userID && !error.userPass)
      return true
    else
     return false
  }
  const login = () =>{
    if(validationlogin(userLogin)){
      postAxios("/login",userLogin)
      .then((result)=>{
        if(result.data.user==true){
          localStorage.setItem("userId",result.data[0]._id)
          localStorage.setItem("userName",result.data[0].userName)
          dispatch(setLogInOut(true))
          dispatch(logout())
          setMsgBox(<MessageBox msg={"Login Successfully"} type={"S"}/>)
          checkUserActivate()
        }else if(result.data==false){
          dispatch(setLogInOut(false))
          setMsgBox(<MessageBox msg={"Invalide Credential"} type={"E"}/>)
        }else{
          dispatch(setLogInOut(false))
          setMsgBox(<MessageBox msg={result.data} type={"E"}/>)
        }
      })
      .catch(err=>console.log(err))
    }
  }
  useEffect(()=>{
    let timer = setTimeout(() => setMsgBox('') , 2010);
        return () => clearTimeout(timer); 
  },[msgBox])
  useEffect(()=>{
    checkUserActivate()
  },[])
  const checkUserActivate = () =>{
    if(localStorage.getItem("userId")){
      getAxios(`/login/${localStorage.getItem("userId")}`)
      .then((result) =>{
        if(result.data.user==true){
          dispatch(setLogInOut(true))
          if(result.data[0].userFav.length > 0) result.data[0].userFav.map(ele=>dispatch(addToMyFAvProduct(ele)))
          if(result.data[0].userCart.length > 0) result.data[0].userCart.map(ele=>dispatch(addToCartProduct(ele)))
        }
      })
      .catch(err => console.log(err))
    }
  }
  const testLogin = () =>{
    setMsgBox(<MessageBox msg={"Login Successfully"} type={"S"}/>)
    dispatch(setLogInOut(true))
    dispatch(logout())
  }
  return (
    <>
    {isShowLogin==1 ? 
    <div className="login-block">
        <div className="login-container" style={{display:isloginboxShow==1?'block':'none'}}>
          <div className='close-block' onClick={()=>dispatch(logout())}><CloseIcon /></div>
          <div className='login-box'>
            <h1>Login</h1>
            <div className="input-holder">
              <div className="input-set">
                <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center',width: '100%' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id='userID' error={loginError.userID} onChange={handleChangeLogin}
                    sx={{width: '70%'}} label="Enter your Mobile No. or Email ID" variant="standard" />
                </Box>
              </div>
              <div className="input-set">
                <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center',width: '100%' }}>
                  <LockPersonOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id='userPass' error={loginError.userPass} onChange={handleChangeLogin}
                    sx={{width: '70%'}} type={isShowHidePass ? 'text':'password'}  label="Enter your password" variant="standard" />
                  {isShowHidePass ?
                  <VisibilityOutlinedIcon sx={{ color: 'action.active', mx: -1.5, cursor:'pointer' }} onClick={() => setShowHidePass(false)}/> :
                  <VisibilityOffOutlinedIcon sx={{ color: 'action.active', mx: -1.5, cursor:'pointer' }} onClick={() => setShowHidePass(true)}/> 
                  }
                </Box>
              </div>
            </div>
            <div className="log-btn">
              <Button onClick={locallyTestLogin ? testLogin:login} sx={{width:'50%'}} variant="contained" color="secondary" fullWidth>
              {locallyTestLogin?'Test ':""} LOGIN
              </Button>
            </div>
          </div>
          <div className='menu-log'>
            <div onClick={()=>{setdisplayLoginBox(0);setdisplaySignupBox(1);}}>Create an Account !</div>
            <div>Forget Password !</div>
          </div>
        </div>
        <div className="signup-container" >
          <div className="signup-box" style={{display:isSignupShow==1?'block':'none'}}>
            <div className='close-block'onClick={()=>dispatch(logout())}><CloseIcon /></div>
            <h1>SignUp</h1>
            <div className="input-holder">
              <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center',width: '100%' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      error={userError.userName} onChange={handleChanges} value={userDetails.userName}
                      sx={{width: '70%'}} 
                      id="userName" label="Enter your Name" variant="standard" />
              </Box>
              <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center',width: '100%' }}>
                    <CallIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      error={userError.userMob} onChange={handleChanges} value={userDetails.userMob}
                      sx={{width: '70%'}} helperText={userDetails.userMob.length > 10 ? "Only 10 Digit Allow":""}
                      id="userMob" label="Enter your Mobile No." variant="standard" />
              </Box>
              <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center',width: '100%' }}>
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      error={userError.userEmail} onChange={handleChanges} value={userDetails.userEmail}
                      sx={{width: '70%'}}  id="userEmail" label="Enter your Email" variant="standard" />
              </Box>
              <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center',width: '100%' }}>
                    <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                      error={userError.userPass} onChange={handleChanges} value={userDetails.userPass}
                      sx={{width: '70%'}} type={isShowHidePass ? 'text':'password'}  id="userPass" label="Enter your Password" variant="standard" />
                      {isShowHidePass ?
                      <VisibilityOutlinedIcon sx={{ color: 'action.active', mx: -1.5, cursor:'pointer' }} onClick={() => setShowHidePass(false)}/> :
                      <VisibilityOffOutlinedIcon sx={{ color: 'action.active', mx: -1.5, cursor:'pointer' }} onClick={() => setShowHidePass(true)}/> 
                      }
              </Box>

            </div>
            <div className="log-btn" onClick={()=>setdisplayLoginBox(0)}>
              <Button onClick={createAccount} sx={{width:'50%'}} variant="contained" color="secondary" fullWidth >
              Create Account
              </Button>
            </div>
            <div className='menu-up' onClick={()=>{setdisplayLoginBox(1);setdisplaySignupBox(0);}}>Login With Your Account !</div>
          </div>
        </div>
    </div>:""}
    {msgBox}
    </>
  )
}

export default Login