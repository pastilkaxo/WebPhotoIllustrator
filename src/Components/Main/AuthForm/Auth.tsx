import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GoogleLogin } from '@react-oauth/google';
import ErrorAlert from '../../ErrorAlerts/ErrorAlert';
import { useNavigate } from 'react-router-dom';

export default function Auth() {

  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("Login Success: currentUser:", credentialResponse);
    navigate("/")
  }

  return (
    <Box component="form"
    sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
    noValidate
      autoComplete="off" >
      <div className='d-flex flex-column justify-content-center align-items-center'>
      <p className='text-center text-dark pt-3 fs-2'>Добро пожаловать в <br/><b>Muse</b></p>
      <TextField id="outlined-basic" label="Электронный адрес" variant="outlined" />
      <TextField
          id="outlined-password-input"
          label="Пароль"
          type="password"
          autoComplete="current-password"
        />
        <a href='#' style={{textDecoration:"none"}}>Забыли пароль?</a>
        <button type='submit' id='accEnter'>Войти</button>
        <p className='text-dark m-0 p-1'>ИЛИ</p>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => <ErrorAlert message="Ошибка входа" />}
        />
        <a className='pt-2'  href='#' style={{textDecoration:"none", fontSize:"15px"}}>Ещё не зарегистрированы в Muse? <span className='text-dark'>Зарегистрироваться</span></a>
      </div>
    </Box>
  )
}
