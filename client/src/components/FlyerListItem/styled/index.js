import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    & .flyer-list-item-wrapper {
        width: 80%;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 25px;
        border-top: 10px solid #FAB156;
    }
`;

const FlyerListItemStyled = ({children}) => {
    return <Wrapper>{children}</Wrapper>
}

export default FlyerListItemStyled;