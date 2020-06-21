import styled, {css} from 'styled-components';

const StyledNavigation = styled.div`
  .navbar {
    background-color: ${props=>props.theme.colors.blue};
  }
  & .navbar-brand {
    color: ${props=>props.theme.colors.logo};
    font-size: 1.6rem;
  }
 .navbar-light .navbar-nav .nav-item .nav-link {
    color: ${props=>props.theme.colors.white} !important;
  }
`;

export default StyledNavigation;