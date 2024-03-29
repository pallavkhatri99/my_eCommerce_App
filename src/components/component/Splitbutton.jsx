import {React,useState,useRef} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PopUpConfirmation from './popUpConfirmation';
import { setLogout } from '../../Redux/counterSlice';

const options = ['Guest', 'My Orders', 'Logout'];

export default function SplitButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [popUpAlert, setPopUpAlert] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleClick = () => {
    if(selectedIndex===1){
      navigate('/MyOrder');
    }else if(selectedIndex==2){
      localStorage.clear();
      dispatch(setLogout(true));
      //if(myFavCount.length>0) myFavCount.map(ele=>dispatch(removeFromMyFavProduct(ele)))
      //if(cartCount.length>0) cartCount.map(ele=>dispatch(removeFromCartProduct(ele)))
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup 
        size="small"
        variant="text" 
        color={'error'} 
        ref={anchorRef} 
        aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      //disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {popUpAlert ? <PopUpConfirmation msgTxt="Are You Sure Logout" visible={popUpAlert}/> : ""}
    </>
  );
}