import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    min-height: 100%;
  }

  body{
    background: rgb(131,179,217);
    background: radial-gradient(circle, rgba(131,179,217,1) 0%, rgba(209,185,214,1) 100%);
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button{
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button{
    cursor: pointer;
  }







`;