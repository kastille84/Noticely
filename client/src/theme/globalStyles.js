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
    border-color: #4CAD98;
  }
  .btn-primary:hover {
    backgrond-color: #61FAD9;
  }

  .btn-secondary {
    background-color: #61FAD9;
    border-color: #61FAD9;
  }

  .link {
    cursor: pointer;
    color: #2A3DAD;
  }

  .slide-pane__header {
    background: #4863FA;
    color: #ffffff;
  }
`;

export default GlobalStyle;