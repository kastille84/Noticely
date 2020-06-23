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

  // Animations
  @keyframes blueToLightBlue {
    0% {
      border-top-color: #FAB156
    }

    50% {
      border-top-color: #4863FA
    }

    100% {
      border-top-color: #FAB156
    }
  }
`;

export default GlobalStyle;