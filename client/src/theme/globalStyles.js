import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    /*background-color: red;*/
  }
  * {
    padding: 0;
    margin: 0;
  }

  /*Button colors override  */
  .btn-primary {
    background-color: #4CAD98;
  }
  .btn-secondary {
    background-color: #61FAD9;
  }
`;

export default GlobalStyle;