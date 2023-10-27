import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { setLogInOut, setLogout } from '../../Redux/counterSlice';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUpConfirmation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogout = useSelector((state)=> state.activeUser.logout);
  const [open, setOpen] = React.useState(isLogout);
  React.useEffect(()=>{
    setOpen(isLogout);
  },[isLogout,open])
  const handleClose = () => {
    dispatch(setLogout(false));
    setOpen(false);
  };
  const logout =() => {
    dispatch(setLogInOut(false));
    dispatch(setLogout(false));
    setOpen(false);
    navigate("/");

  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{width:600,height:100,alignItems:'center'}}>
          {"Are you sure want to "}<b>{"LOGOUT !"}</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={logout}>{"LOGOUT"}</Button>
          <Button color="error" onClick={handleClose}>{"CLOSE"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}