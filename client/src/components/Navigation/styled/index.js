import styled, {css} from 'styled-components';

const StyledNavigation = styled.div`
  .navbar {
    background-color: ${props=>props.theme.colors.blue};
  }
  & .navbar-brand {
    color: ${props=>props.theme.colors.logo};
  }
`;

export default StyledNavigation;