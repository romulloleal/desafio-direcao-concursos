import { createGlobalStyle } from 'styled-components'

export const GlobalTheme = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    font-size: 1em;
    font-weight: 400;

    line-height: 1.2;
    letter-spacing: 0em;

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    word-wrap: break-word;
  }

  body {
    color: #FFFFFF;
    background-color: #181818;
  }

  a {text-decoration: none; color: #FFFFFF;}



  /* style progress bar for page change */
  #nprogress .bar {
    background: #00afff;
  }
  /* Fancy blur effect */
  #nprogress .peg {
    box-shadow: 0 0 10px #00afff, 0 0 5px #00afff;
  }
`
